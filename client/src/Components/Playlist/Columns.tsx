import React, {HTMLAttributes} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import styled from 'styled-components';
import {formatDistanceToNow} from 'date-fns';
import {parseISO} from 'date-fns';
import {Text} from "../UI Components/Text"
import {Button} from "../UI Components/Button";
import {Link, To} from "react-router-dom";
import {Badge} from "../UI Components/Badge";
import {TextLink} from "../UI Components/TextLink";
import {FaClock} from 'react-icons/fa';
import {LuClock3} from "react-icons/lu";

// Define the PlaylistTrack type
export type PlaylistTrack = {
    number: number;
    title: string;
    album: string;
    dateAdded: string;
    duration: number;
};

/* TODO: fix the hover style of the links
    fix the width of the table
    fix the scrolling of the table
    create badge for the E(explicit)
 */


// Define the columns for the table, the row in here refers to each object of the items array in the tracks object
// from the PlaylistResponse object
export const columns: TableColumn<any>[] = [
    {
        name: "#",
        width: '55px',
        // selector: (row: any) => row.index,
        cell: (row, id) => (
            <div>
                <Text>{id + 1}</Text>
            </div>
        ),
        center: true,
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: 'center'
        }
    },
    {
        name: "Title",
        cell: row => (
            <div style={{display: "flex", alignItems: "center", gap: "0.8rem",}}>
                <img src={row.track.album.images[2].url} alt={""} style={{borderRadius: "0.15rem"}} height="48px"/>
                <div>
                    <TextLink to={row.track.external_urls.spotify} target="_blank">
                        <Text variant="sm" style={{color: "white", fontWeight: '600'}}>{row.track.name}</Text>
                    </TextLink>
                    <Text variant="xs">{row.track.explicit ? <Badge>E</Badge>
                        : null}
                        {row.track.artists.map((artist: { external_urls: { spotify: To }; name: string }, index: number) => (
                            <TextLink key={index} to={artist.external_urls.spotify}
                                      target={"_blank"}> {artist.name}</TextLink>
                        )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                    </Text>
                </div>
            </div>
        ),
        grow: 2,
        style: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
            // paddingLeft: 0,
            // paddingBottom: '1rem'
        }
    },
    {
        name: "Album",
        selector: (row: any) => row.track.album.name,
        cell: row => (
            <TextLink to={row.track.album.external_urls.spotify} target="_blank">
                <Text variant="sm">{row.track.album.name}</Text>
            </TextLink>
        )
    },
    {
        name: "Date Added",
        selector: (row: any) => formatDistanceToNow(parseISO(row.added_at), {addSuffix: true, includeSeconds: true}),
        center: true,
    },
    {
        name: <LuClock3/>,
        selector: (row: any) => `${Math.floor(row.track.duration_ms / 60000)}:${(row.track.duration_ms % 60).toString().padStart(2, '0')}`,
        center: true,
    }
];

// Styled components for custom cells
const IconCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const DurationCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Table component
// const PlaylistTable: React.FC<{data: PlaylistTrack[]}> = ({data}) => {
//     return (
//         <DataTable
//             columns={columns}
//             data={data}
//             pagination
//             highlightOnHover
//             noHeader
//         />
//     );
// };
