import React from 'react';
import {Statistic, Card, Row, Col, Icon} from 'antd';
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
  root: {
    margin: 15
  },
});

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{color: '#3f8600'}}
              prefix={<Icon type="arrow-up"/>}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{color: '#cf1322'}}
              prefix={<Icon type="arrow-down"/>}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{color: '#cf1322'}}
              prefix={<Icon type="arrow-down"/>}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{color: '#cf1322'}}
              prefix={<Icon type="arrow-down"/>}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
