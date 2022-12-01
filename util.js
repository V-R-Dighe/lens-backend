const fetch = require("node-fetch");
const config = require("./config")

const WEB3_IPFS_TOKEN = config.web3IpfsToken;
class util {

  constructor(){
  }

  async uploadDataToIpfs(postData) {
    const response = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WEB3_IPFS_TOKEN}`,
        contentType: "application/json",
      },
      body: JSON.stringify(postData),
    });
    // console.log({ response });
    const responseJson = await response?.json();
    const cid = responseJson?.cid;
    console.log("Content added with CID:", cid);
    return "ipfs://" + cid;

  }

}

module.exports = new util();