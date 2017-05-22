import React, { PropTypes, Component } from 'react'
import './CommunitySettingsTab.scss'
import Button from 'components/Button'
import ChangeImageButton from 'components/ChangeImageButton'
import Loading from 'components/Loading'
import { bgImageStyle } from 'util/index'
import { bannerUploadSettings, avatarUploadSettings, DEFAULT_BANNER, DEFAULT_AVATAR } from 'store/models/Community'
const { object, func } = PropTypes
import { Control } from 'routes/UserSettings/AccountSettings/AccountSettings'

export default class CommunitySettingsTab extends Component {
  static propTypes = {
    currentUser: object,
    updateUserSettings: func,
    loginWithService: func
  }
  constructor (props) {
    super(props)
    this.state = {edits: {}, changed: false}
  }

  componentDidMount () {
    this.setEditState()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setEditState()
    }
  }

  setEditState () {
    const { community } = this.props
    if (!community) return

    const {
      name, avatarUrl, bannerUrl, tagline, bio, location
    } = community

    this.setState({
      edits: {
        name: name || '',
        avatarUrl: avatarUrl || DEFAULT_AVATAR,
        bannerUrl: bannerUrl || DEFAULT_BANNER,
        tagline: tagline || '',
        bio: bio || '',
        location: location || ''
      }
    })
  }

  render () {
    const { community, updateCommunitySettings } = this.props
    if (!community) return <Loading />

    const { edits, changed } = this.state
    const {
      name, avatarUrl, bannerUrl, tagline, bio, location
    } = edits

    const updateSetting = (key, setChanged = true) => event => {
      const { edits, changed } = this.state
      this.setState({
        changed: setChanged ? true : changed,
        edits: {
          ...edits,
          [key]: event.target.value
        }
      })
    }

    const updateSettingDirectly = (key, changed) => value =>
      updateSetting(key, changed)({target: {value}})

    const save = () => {
      this.setState({changed: false})
      updateCommunitySettings(edits)
    }

    return <div>
      <input type='text' styleName='name' onChange={updateSetting('name')} value={name || ''} />
      <div style={bgImageStyle(bannerUrl)} styleName='banner'>
        <ChangeImageButton
          update={updateSettingDirectly('bannerUrl')}
          uploadSettings={bannerUploadSettings(community)}
          styleName='change-banner-button' />
      </div>
      <div style={bgImageStyle(avatarUrl)} styleName='avatar'>
        <ChangeImageButton
          update={updateSettingDirectly('avatarUrl')}
          uploadSettings={avatarUploadSettings(community)}
          styleName='change-avatar-button' />
      </div>
      <Control label='Tagline' onChange={updateSetting('tagline')} value={tagline} />
      <Control label='About Me' onChange={updateSetting('bio')} value={bio} type='textarea' />
      <Control label='Location' onChange={updateSetting('location')} value={location} />
      <div styleName='button-row'>
        <Button label='Save Changes' color={changed ? 'green' : 'gray'} onClick={changed ? save : null} styleName='save-button' />
      </div>
    </div>
  }
}
