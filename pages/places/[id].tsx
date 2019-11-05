import {NextPage} from 'next';
import ErrorPage from 'next/error'
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';
import * as React from "react";
import Card from "../../components/Card";

type LocalTimeRange = {
    start: string;
    end: string;
};

type OpeningHoursRange = {
    weekdayStart: string;
    weekdayEnd: string;

    localTimeRanges: LocalTimeRange[];
};

const OpenRanges = ({localTimeRanges} : {localTimeRanges: LocalTimeRange[]}) => {
    function stripSeconds(time: string) {
        return time.split(":").slice(0, 2).join(":");
    }

    return <div>
        {
            localTimeRanges.map(range => <div style={{padding: "10px"}}>{stripSeconds(range.start) + " - " + stripSeconds(range.end)}</div>)
        }
    </div>;
};

const Weekdays = ({start, end} : {start: string, end: string}) =>
    <div style={{padding: "10px 10px 10px 0"}}>{start === end ? start : start + " - " + end}</div>;

interface IOpeningHoursProps {
    openingHoursRanges: OpeningHoursRange[];
}
const OpeningHours = (props: IOpeningHoursProps) => (
  <>
      <div>
      {
          props.openingHoursRanges.map(range => {
              return <div className="opening-hours">
                  <Weekdays start={range.weekdayStart} end={range.weekdayEnd}/>
                  <OpenRanges localTimeRanges={range.localTimeRanges}/>
              </div>
              }
          )
      }
      </div>
      <style jsx>{`
        .opening-hours {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
      `}
      </style>
  </>
);

interface IPlaceProps {
    data?: {
        name: string;
        address: string;
        openingHoursRanges: OpeningHoursRange[];
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
                    <Card title={data.name}>
                        <p>{data.address}</p>
                    </Card>
                    <Card title="Opening Hours">
                        <OpeningHours openingHoursRanges={data.openingHoursRanges}/>
                    </Card>
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
                address: data.address,
                openingHoursRanges: data.openingHoursRanges
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
