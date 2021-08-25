const { BadRequest, GeneralError } = require('@feathersjs/errors');
const thumbnail = require('image-thumbnail');
const { v4: uuid_v4 } = require('uuid');


// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.

module.exports = function (options) {
  return async context => {
    const uploadConfig = context.app.get('upload');
    const params = context.params;
    const data = context.data;
    const fileKey = uuid_v4();
    let moduleId = data.id;

    if (context.id) {
      moduleId = context.id;
    }

    if (context.params.files &&
      context.params.files[options.fileFieldName]) {     

      if (!params || !params.user) {
        throw new BadRequest('Not authenticated');
      }

      if (!moduleId) {
        throw new BadRequest('Not module id');
      }

      const tempFileDir = `./tmp/${fileKey}/${params.user.id}/${moduleId}`;
      const finalFileDir = `./commited/${params.user.id}/${moduleId}`;
      
      const aFile = context.params.files[options.fileFieldName];
      const newFileName = `${tempFileDir}/${fileKey}`;
      const thumbDisk = context.app.get('storeClient').disk(`${options.storage_prefix}-thumbs`);
      const picsDisk = context.app.get('storeClient').disk(`${options.storage_prefix}-pics`);
      const nfoDisk = context.app.get('storeClient').disk('alexandria');

      if (aFile.size > uploadConfig[options.fileItemName].max_file_size) {
        throw new BadRequest(`The max size for a [${options.fileItemName}] is [${uploadConfig[options.fileItemName].max_file_size}] bytes`);
      }

      const matchFileContent =  uploadConfig[options.fileItemName].allowed_content_types.filter(fileType => {
        if (aFile.mimetype === fileType) {
          return fileType;
        }
      });

      if (!matchFileContent) {
        throw new BadRequest(`The mime type [${aFile.mimeType}] is not allowed!`);
      }



      if (uploadConfig[options.fileItemName].generate_thumbnail) {
        const thumbContent = await thumbnail(aFile.data,{
          'responseType': 'buffer',
          'width': 320,
          'height': 240
        });

        console.log(newFileName)
        try {
          const { exists } = await thumbDisk.exists(newFileName);
          if (exists) {
            await thumbDisk.delete(newFileName);
          }
          await thumbDisk.put(newFileName, thumbContent);
        } catch (e) {
          throw new GeneralError('Could not possible to upload thumbnail', e);
        }
      }

      try {
        const { exists } = await picsDisk.exists(newFileName);
        if (exists) {
          await picsDisk.delete(newFileName);
        }
        await picsDisk.put(newFileName, aFile.data);
        await nfoDisk.put(`${fileKey}.nfo`, JSON.stringify({
          name: aFile.name,
          encoding: aFile.encoding,
          mimetype: aFile.mimetype,
          size: aFile.size
        }));
      } catch (e) {
        throw new GeneralError('Could not possible to upload file', e);
      }

      context.data[options.fieldFileId] = `${finalFileDir}/${fileKey}`;
      context.data[`${options.fieldFileId}_short_file_name`] = fileKey;
      context.data[`${options.fieldFileId}_tmp_dir_name`] = tempFileDir;

    }

    return context;
  };
};
