import React, { useState } from 'react';
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

const FlatListCustom = ({
  data,
  onItemClick,
  customRenderItem,
  swipeOutOptions,
  ...props
}) => {
  const [selected, setSelected] = useState(new Map());

  const renderSeparator = () => {
    return <Separator />;
  };

  const keyExtractor = (item, index) => `${item.node.id} ${index}`;

  const onPressItem = node => {
    const selectedNow = new Map(selected);
    selectedNow.set(node.id, !selectedNow.get(node.id));
    setSelected(selectedNow);

    onItemClick(node);
  };

  const renderItem = ({ item: { node } }) => {
    return (
      <FlatListItem
        key={idx(node, _ => _.id)}
        id={idx(node, _ => _.id)}
        onPressItem={() => onPressItem(node)}
        selected={!!selected.get(idx(node, _ => _.id))}
        title={node.title}
        ItemSeparatorComponent={renderSeparator}
        swipeOutOptions={swipeOutOptions && swipeOutOptions(node)}
      >
        {customRenderItem && customRenderItem(node)}
      </FlatListItem>
    );
  };

  return (
    <StyledFlatList
      data={data}
      // extraData={this.state}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      {...props}
    />
  );
};

export default FlatListCustom;
