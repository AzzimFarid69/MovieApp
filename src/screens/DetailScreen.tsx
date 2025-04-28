import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailScreenRouteProp;
}

interface MovieDetail {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string;
  plot: string;
  rating: string;
}

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await axios.get<MovieDetail>(`https://www.freetestapi.com/api/v1/movies/${id}`);
      setMovie(response.data);
    } catch (err) {
      setError('Failed to load movie details.');
    } finally {
      setLoading(false);
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

  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text>Director: {movie.director}</Text>
      <Text>Year: {movie.year}</Text>
      <Text>Genre: {movie.genre}</Text>
      <Text>Plot: {movie.plot}</Text>
      <Text>Rating: {movie.rating}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;