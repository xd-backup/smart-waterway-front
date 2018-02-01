import React from 'react'
import { observer } from 'mobx-react'

import { Viewer, CesiumTerrainProvider } from 'cesium/Cesium'
import Cesium from 'cesium/Cesium'
require('cesium/Widgets/widgets.css')

import constants from '../utilities/constants'

@observer class CesiumViewer extends React.Component {
  constructor() {
    super()

    // member function
    this.componentDidMount = this.componentDidMount.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
    this.viewer = new Viewer('cesiumContainer')
    const terrainProvider = new CesiumTerrainProvider({
      url : '//assets.agi.com/stk-terrain/world',
      requestVertexNormals: true,
      requestWaterMask: true
    })

    this.viewer.terrainProvider = terrainProvider

    var citizensBankPark = this.viewer.entities.add({
      name : '市民公园',
      position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
      point : {
          pixelSize : 5,
          color : Cesium.Color.RED,
          outlineColor : Cesium.Color.WHITE,
          outlineWidth : 2
      },
      label : {
          text : '市民公园',
          font : '14pt monospace',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth : 2,
          verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
          pixelOffset : new Cesium.Cartesian2(0, -9)
      }
    });

    citizensBankPark.description = '<p>公园介绍：非常好</p>'
  
    this.viewer.zoomTo(this.viewer.entities);
  }

  // helper

  render() {
    return <div id="cesiumContainer" />
  }
}

export default CesiumViewer
