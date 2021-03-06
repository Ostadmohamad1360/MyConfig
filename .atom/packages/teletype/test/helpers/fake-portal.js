const {FollowState} = require('@atom/teletype-client')
const FakeEditorProxy = require('./fake-editor-proxy')

module.exports =
class FakePortal {
  constructor () {
    this.activeEditorProxyChangeCount = 0
  }

  dispose () {}

  createBufferProxy () {
    return {
      dispose () {},
      setDelegate () {},
      createCheckpoint () {},
      groupChangesSinceCheckpoint () {},
      applyGroupingInterval () {}
    }
  }

  createEditorProxy () {
    return new FakeEditorProxy()
  }

  follow (siteId) {
    this.followedSiteId = siteId
    this.setFollowState(FollowState.RETRACTED)
  }

  unfollow () {
    this.followedSiteId = null
    this.setFollowState(FollowState.DISCONNECTED)
  }

  setFollowState (followState) {
    this.followState = followState
  }

  resolveFollowState () {
    return this.followState
  }

  getFollowedSiteId () {
    return this.followedSiteId
  }

  activateEditorProxy (editorProxy) {
    this.activeEditorProxy = editorProxy
    this.activeEditorProxyChangeCount++
  }

  removeEditorProxy () {}

  getActiveEditorProxy () {
    return this.activeEditorProxy
  }

  setDelegate (delegate) {
    this.delegate = delegate
  }

  getSiteIdentity (siteId) {
    return {login: 'site-' + siteId}
  }
}
