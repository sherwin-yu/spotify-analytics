import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';

const HeightWrapper = styled.div`
  height: 500px;
`;

const Title = styled.div`
  font-size: 22px;
`;

const Text = styled.div`
  font-size: 28px;
  align-self: center;
`;

const TopGenres = ({ genres }) => (
  <div>
    <Title>Top Genres</Title>
    <div className="row">
      <div className="col-md-5" style={{ display: 'flex' }}>
        <Text>Your top genre is Pop which occurs in 40% of your top songs</Text>
      </div>
      <div className="col-md-7">
        <HeightWrapper>
          <ResponsivePie
            data={genres.slice(0, 5)}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'yellow_green' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableRadialLabels={false}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color', modifiers: [] }}
            sliceLabel="id"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            sortByValue
            animate
            motionStiffness={90}
            motionDamping={15}
            isInteractive={false}
          />
        </HeightWrapper>
      </div>
    </div>
  </div>
);

export default TopGenres;
