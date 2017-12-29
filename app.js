import React from 'react';
import UiTemplateSide from './template/UiTemplateSideComponent'
import UiTemplateHeader from './template/UiTemplateHeaderComponent'
import UiTemplateMain from './template/UiTemplateMainComponent'

class App extends React.Component {
  render() {
    return (
      <div>
        <UiTemplateSide />
        <UiTemplateHeader />
        <UiTemplateMain />
      </div>
    )
  }
}

export default App;