const config = require("./config")

const CREATE_POST_VIA_DISPATCHER = `mutation CreatePostViaDispatcher($postDataCID: Url!) {
  createPostViaDispatcher(
    request: {
      profileId: "${config.profileId}"
      contentURI: $postDataCID
      collectModule: { freeCollectModule: { followerOnly: true } }
      referenceModule: { followerOnlyReferenceModule: false }
    }
  ) {
    ... on RelayerResult {
      txHash
      txId
    }
    ... on RelayError {
      reason
    }
  }
}`

module.exports = {CREATE_POST_VIA_DISPATCHER}