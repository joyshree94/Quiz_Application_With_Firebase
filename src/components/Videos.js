import { Link } from "react-router-dom";
import Video from './Video';
import { useState } from "react";
import useVideoList from "../hooks/useVideoList";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Videos(){
    const [page, setPage] = useState(1);
    const { loading, error, videos,hasMore } = useVideoList(0);
    return(

        <div>
          {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader="loading...."
          next={() => setPage(page + 12)}
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link to={{
                pathname: `/quiz/${video.youtubeID}`,
                state: {
                  videoTitle: video.title,
                },
              }} key={video.youtubeID}>
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            )
          )}
        </InfiniteScroll>
      )}
              {!loading && videos.length === 0 && <div>No data found!</div>}
              {error && <div>There was an error!</div>}
              {loading && <div>Loading...</div>}
        
        </div>

    );
}