const util = require('./util');
const gqlHelper = require('./gqlHelper');
const { v4: uuidv4 } = require('uuid');
const config = require("./config");

async function main(){

    const imageCid = config.imageCid;

    const postMetadata = {
        version: "2.0.0",
        mainContentFocus: "IMAGE",
        metadata_id: uuidv4(),
        description: "Description",
        locale: "en-US",
        content: "Post of the day",
        external_url: null,
        image: imageCid,
        imageMimeType: config.imageType,
        name: "Test Image",
        media: [
          {
            item: imageCid,
            type: config.imageType,
          },
        ],
        attributes: [],
        tags: [],
        appId: "lens-backend",
      };

    const metadataCid = await util.uploadDataToIpfs(postMetadata);
    return await gqlHelper.createPostViaDispatcher(metadataCid);
}

main().then(console.log);