import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { addIndex, map } from 'ramda';
import { Message } from 'semantic-ui-react';

const mapIndexed = addIndex(map);

const AddressItem = ({ index, item, onClick }) => (
  <Message.Item>
    <a className="button" role="button" tabIndex="-1" onClick={e => onClick(e, index)}>
      {item.formatted_address}
    </a>
  </Message.Item>
);

AddressItem.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    formatted_address: PropTypes.string.isRequired,
  }).isRequired,
};

const AddressSelector = ({ addresses, header, onClick, visible }) => (
  <Message info hidden={!visible}>
    <Message.Header>{header}</Message.Header>
    <Message.List>
      {mapIndexed((item, index) =>
        (<AddressItem index={index} item={item} onClick={onClick} key={index} />),
        addresses)}
    </Message.List>
  </Message>
);

AddressSelector.propTypes = {
  header: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  addresses: IPT.list.isRequired,
};

export default AddressSelector;
