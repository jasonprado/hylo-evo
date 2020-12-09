import React, { Component } from 'react'
import { isEmpty, map } from 'lodash'
import cx from 'classnames'
import Pillbox from 'components/Pillbox'
import Loading from 'components/Loading'
import './SkillsSection.scss'

export default class SkillsSection extends Component {
  static defaultProps = {
    editable: true,
    label: 'Add a Skill or Interest',
    placeholder: 'skills and interests do you have?'
  }

  componentDidMount () {
    this.props.fetchMemberSkills()
  }

  componentDidUpdate (prevProps) {
    if (!isEmpty(this.props.search) && prevProps.search !== this.props.search) {
      this.props.fetchSkillSuggestions()
    }
    if (prevProps.personId !== this.props.personId) {
      this.props.fetchMemberSkills()
    }
  }

  handleInputChange = (input) => this.props.setSearch(input)

  handleAddition = (skill) => {
    this.props.setSearch('')
    this.props.addSkill(skill.name)
  }

  handleDelete = skillId => this.props.removeSkill(skillId)

  handleClick = (skillId, skillLabel) => {
    this.props.searchForSkill(skillLabel)
  }

  render () {
    if (this.props.loading) return <Loading />

    const {
      editable,
      isMe,
      label,
      placeholder,
      skills,
      skillSuggestions
    } = this.props

    return <div styleName={cx('pill-container', 'expanded')}>
      <Pillbox
        pills={map(skills, skill => ({ ...skill, label: skill.name }))}
        handleInputChange={this.handleInputChange}
        handleClick={this.handleClick}
        handleAddition={this.handleAddition}
        handleDelete={this.handleDelete}
        editable={editable && isMe}
        addLabel={label}
        placeholder={`What ${!isEmpty(skills) ? 'other ' : ''}${placeholder}`}
        suggestions={skillSuggestions}
      />
    </div>
  }
}
