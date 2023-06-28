/* eslint-disable no-restricted-globals */
import React from 'react';
// import { Card } from 'antd';
import './home.scss';

// const { Meta } = Card;
interface HomeProps {
  status: string;
  onLeaveOrJoinSession: () => void;
}
const Home: React.FunctionComponent<HomeProps> = (props) => {
  // const {status, onLeaveOrJoinSession } = props;
  // const onCardClick = (type: string) => {
  //   history.push(`/${type}${location.search}`);
  // };

  return (
    <div>
      <h1>video </h1>
    </div>
  );
};
export default Home;
