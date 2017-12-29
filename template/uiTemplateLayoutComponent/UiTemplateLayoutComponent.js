import React from "react";
import UiTemplateSide from 
  '../uiTemplateSideComponent/UiTemplateSideComponent'
import UiTemplateHeader from 
  '../uiTemplateHeaderComponent/UiTemplateHeaderComponent'
import UiTemplateMain from 
  '../uiTemplateMainComponent/UiTemplateMainComponent'
import Scss from './uiTemplateLayout.scss'

const UiTemplateLayout= () => (
  <div className="uitemplate__layout">
    <div className="uitemplate__layout--side">
      <UiTemplateSide />
    </div>
    <div className="uitemplate__layout--main">
      <UiTemplateHeader />
      <UiTemplateMain />
    </div>
  </div>
);

export default UiTemplateLayout;