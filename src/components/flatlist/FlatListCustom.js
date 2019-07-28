import * as React from 'react';
import { FlatList } from 'react-native';
import idx from 'idx';
import styled from 'styled-components/native';

import FlatListItem from './FlatListItem';

const Separator = styled.View`
  height: 1;
  width: 86%;
  background-color: #ced0ce;
  margin-left: 14%;
`;

const StyledFlatList = styled(FlatList)`
  flex: 1;
`;

class FlatListCustom extends React.PureComponent {
  state = { selected: new Map() };

  renderSeparator = () => {
    return <Separator />;
  };

  _keyExtractor = (item, index) => `${item.node.id} ${index}`;

  _onPressItem = node => {
    this.setState(state => {
      const selected = new Map(state.selected);
      selected.set(node.id, !selected.get(node.id)); // toggle
      return { selected };
    });

    this.props.onItemClick(node);
  };

  _renderItem = ({ item: { node } }) => {
    const { selected } = this.state;
    const { customRenderItem, swipeOutOptions } = this.props;

    return (
      <FlatListItem
        key={idx(node, _ => _.id)}
        id={idx(node, _ => _.id)}
        onPressItem={() => this._onPressItem(node)}
        selected={!!selected.get(idx(node, _ => _.id))}
        title={node.title}
        ItemSeparatorComponent={this.renderSeparator}
        swipeOutOptions={swipeOutOptions && swipeOutOptions(node)}
      >
        {customRenderItem && customRenderItem(node)}
      </FlatListItem>
    );
  };

  render() {
    return (
      <StyledFlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        {...this.props}
      />
    );
  }
}

export default FlatListCustom;
