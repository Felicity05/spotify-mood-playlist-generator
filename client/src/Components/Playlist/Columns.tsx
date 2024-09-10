import React, {ReactNode} from 'react';
import {TableColumn} from 'react-data-table-component';
import styled from 'styled-components';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {Text} from "../UI Components/Text"
import {To} from "react-router-dom";
import {Badge} from "../UI Components/Badge";
import {TextLink} from "../UI Components/TextLink";
import {LuClock3} from "react-icons/lu";

// Define the PlaylistTrack type
export type PlaylistTrack = {
    number: number;
    title: string;
    album: string;
    dateAdded: string;
    duration: number;
};


// Define the columns for the table, the row in here refers to each object of the items array in the tracks object
// from the PlaylistResponse object
export const columns: TableColumn<any>[] = [
    {
        name: "#",
        width: '58px',
        // selector: (row: any) => row.index,
        cell: (row, id) => (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: 'center'
            }}>
                <Text>{id + 1}</Text>
            </div>
        ),
        center: true,
        hide: 768,
    },
    {
        name: "Title",
        cell: row => (
            <div style={{display: "flex", alignItems: "center", gap: "0.8rem", overflow: "hidden"}}>
                <img src={row.track.album.images[2].url} alt={""} style={{borderRadius: "0.15rem"}} height="48px"/>
                <div style={{overflow: "hidden", whiteSpace: "nowrap",}}>
                    <TextLink to={row.track.external_urls.spotify} target="_blank" style={{overflow: "hidden"}}>
                        <Text variant="sm" style={{
                            color: "white", fontWeight: '600',
                            textOverflow: "ellipsis", overflow: "hidden",
                        }}>
                            {row.track.name}
                        </Text>
                    </TextLink>
                    <div style={{overflow: "hidden"}}>
                        <div style={{
                            overflow: "hidden", textOverflow: "ellipsis",
                            display: "flex", alignItems: "center"
                        }}>
                            {row.track.explicit ? <Badge>E</Badge> : null}
                            <Text variant={"xs"}
                                  style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                                {row.track.artists.map((artist: {
                                    external_urls: { spotify: To };
                                    name: string
                                }, index: number) => (
                                    <TextLink key={index} to={artist.external_urls.spotify}
                                              target={"_blank"}>{artist.name}
                                    </TextLink>
                                )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        ),
        grow: 2.5,
        style: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
            overflow: "hidden",
        }
    },
    {
        name: "Album",
        selector: (row: any) => row.track.album.name,
        cell: row => (
            <TextLink to={row.track.album.external_urls.spotify} target="_blank" style={{overflow: "hidden"}}>
                <Text variant="sm" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                    {row.track.album.name}
                </Text>
            </TextLink>
        ),
        grow: 2,
        hide: 500,
    },
    {
        name: "Date Added",
        // selector: (row: any) => row.added_at,
        cell: row => (
            <Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                {new Date(row.added_at).getFullYear() <= new Date().getFullYear() - 10 ? "over 10 years ago" :
                    formatDistanceToNow(parseISO(row.added_at), {addSuffix: true, includeSeconds: true})
                }
            </Text>
        ),
        hide: 1100,
    },
    {
        name: <LuClock3/>,
        selector: (row: any) => `${Math.floor(row.track.duration_ms / 60000)}:${Math.floor(row.track.duration_ms / 1000 % 60)}`,
        center: true,
        hide: 425,
    }
];
