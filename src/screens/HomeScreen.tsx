import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";
import MovieItem from '../components/MovieItem';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Movie[]>('https://www.freetestapi.com/api/v1/movies');
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = async (text: string) => {
      setSearchQuery(text);
      if (text.length > 0) {
        try {
          const response = await axios.get<Movie[]>(`https://www.freetestapi.com/api/v1/movies?search=${text}`);
          setFilteredMovies(response.data);
        } catch (err) {
          setError('Failed to search movies.');
        }
      } else {
        setFilteredMovies(movies);
      }
    };
  
    if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }
  
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movies..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredMovies.slice(0, 20)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
              <MovieItem movie={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBar: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      margin: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default HomeScreen;