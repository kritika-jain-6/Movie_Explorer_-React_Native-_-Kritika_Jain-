import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { addWatchList,deleteWatchList,getWatchList } from '../api/WatchList';
import { Toast } from 'toastify-react-native';
interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string;
  description: string;
}

interface WatchlistContextProps {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextProps | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [reload, setReload] = useState(false);
  const addToWatchlist = async(movie: Movie) => {
    try {
      const response = await addWatchList(movie.id);
      if (response) {
        setReload(!reload);
        Toast.success('Movie added to watchlist');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const fetchWatchlist = async () => {
    try {      
      const response = await getWatchList();
      setWatchlist(response.data);
      console.log('Fetched watchlist:', response.data);
      
      
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  useEffect(()=>{
    fetchWatchlist();
  },[reload])

  const removeFromWatchlist = async(id: string) => {
    try {
      await deleteWatchList(id);
      setReload(!reload);
      Toast.success('Movie removed from watchlist');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const isInWatchlist = (id: string) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
