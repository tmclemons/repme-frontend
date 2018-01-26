import React from "react";
import UiTemplateSide from 
  '../uiTemplateSideComponent/UiTemplateSideComponent'
import UiTemplateHeader from 
  '../uiTemplateHeaderComponent/UiTemplateHeaderComponent'
import UiTemplateMain from 
  '../uiTemplateMainComponent/UiTemplateMainComponent'
import Scss from './uiTemplateLayout.scss'

class UiTemplateLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    }
  }

  handleToggle = () => { 
    this.setState({ active: !this.state.active })
  }

  render() {
    return (
      <div className="uitemplate__layout">
        <div className={`uitemplate__layout--side ${this.state.active
          ? '' : 'closed'}`}>
          <UiTemplateSide active={this.state.active}/>
        </div>
        <div className="uitemplate__layout--main">
          <UiTemplateHeader 
            active={this.state.active} 
            callback={this.handleToggle}
            title={this.props.data.routeTitle}
          />
          <UiTemplateMain data={this.props.data}/>
        </div>
      </div>
    )
  }
}

export default UiTemplateLayout;