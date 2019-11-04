import { NextPage } from 'next';
import ErrorPage from 'next/error'
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';
import * as React from "react";

interface IPlaceProps {
    data?: {
        name: string;
        address: string;
    },
    error?: {
        statusCode
    }
}

const Place: NextPage<IPlaceProps> = ({error, data}) => {
    if (error) {
        return <ErrorPage statusCode={error.statusCode} />
    } else {
        return (
            <Layout>
                <div className="container">
                    <div>
                        <p>{data.name}</p>
                        <p>{data.address}</p>
                    </div>
                    <div>
                        <b>Opening hours</b>
                    </div>
                </div>
                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                `}</style>
            </Layout>
        );
    }
};

Place.getInitialProps = async ({ query }) => {
    const { id } = query;
    const res = await fetch(`http://localhost:8080/places/${id}`);
    if (res.ok) {
        const data = await res.json();

        console.log(`Show data fetched. Count: ${data.length}`);

        return {
            data: {
                name: data.name,
                address: data.address
            }
        };
    } else {
        return {
            error: {
                statusCode: res.status
            }
        }
    }

};

export default Place;
