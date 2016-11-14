import React from 'react'
import { Grid, Cell } from 'react-mdl'
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized'
import shallowCompare from 'react-addons-shallow-compare'

const MATERIAL_DEVICES = {
  PHONE: 'phone',
  TABLET: 'tablet',
  LAPTOP: 'col'
}

const MATERIAL_COLUMNS = {
  [MATERIAL_DEVICES.PHONE]: 4,
  [MATERIAL_DEVICES.TABLET]: 8,
  [MATERIAL_DEVICES.LAPTOP]: 12
}

const getDeviceName = width =>
  width <= 479 ? MATERIAL_DEVICES.PHONE : (
    width >= 480 && width <= 839 ? MATERIAL_DEVICES.TABLET : MATERIAL_DEVICES.LAPTOP
  )

const getDevice = () => {
  const w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth
  return getDeviceName(width)
}

class VirtualizedMDLGrid extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      device: MATERIAL_DEVICES.PHONE
    }
    this.isRowLoaded = this.isRowLoaded.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ device: getDevice() }))
    this.setState({ device: getDevice() })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  isRowLoaded({ index }) {
    const {
      itemsPerPage,
      items,
      [this.state.device]: currentColumnCount
    } = this.props
    console.log(`(index = ${index}, first row item index = ${index * currentColumnCount}) => is page ${Math.floor(index * currentColumnCount / itemsPerPage)} loaded ?`, !!items[index * currentColumnCount])
    return !!items[index * currentColumnCount]
  }

  render() {
    const {
      style,
      className,
      loadMoreRows,
      minimumBatchSize,
      threshold,
      remoteRowCount = 10000,
      infinite = false
    } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => infinite ? (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={loadMoreRows}
            minimumBatchSize={minimumBatchSize}
            rowCount={remoteRowCount}
            threshold={threshold}
          >
            {({ onRowsRendered, registerChild }) => (
              this.renderList({ height, width, onRowsRendered, registerChild })
            )}
          </InfiniteLoader>
        ) : this.renderList({ height, width })}
      </AutoSizer>
    )
  }

  renderList({ height, width, onRowsRendered, registerChild }) {
    const {
      items,
      getCellKey,
      renderItem,
      overscanRowCount = 0,
      rowHeight = 355
    } = this.props
    const currentTotalColumn = MATERIAL_COLUMNS[this.state.device]
    const currentColumnCount = this.props[this.state.device]
    const rowCount = items && (items.length / currentColumnCount)
    return (
      <List
        height={height}
        rowHeight={rowHeight}
        rowCount={rowCount}
        width={width}
        overscanRowCount={overscanRowCount}
        onRowsRendered={onRowsRendered}
        registerChild={registerChild}
        rowRenderer={({ index, isScrolling, style }) => {
          const _items = items.slice(index * currentColumnCount, index * currentColumnCount + currentColumnCount)
          return (
            <Grid style={style} key={index}>
              {_items.map((item, i) => (
                <Cell col={currentTotalColumn / currentColumnCount} key={getCellKey ? getCellKey(item) : i }>
                  {renderItem(item, isScrolling)}
                </Cell>
              ))}
            </Grid>
          )
        }}
      />
    )
  }

}

export default VirtualizedMDLGrid
