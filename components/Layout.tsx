import * as React from "react";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    fontFamily: 'helvetica',
    backgroundColor: '#F0F0F0'
};

const Layout = props => (
    <div style={layoutStyle}>
        {props.children}
    </div>
);

export default Layout;
