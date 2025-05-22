import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface AddMovieModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (formData: FormData) => void;
  onEdit?:(id:number,formData:FormData)=>void;
  movie?: any;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
  visible,
  onClose,
  onAdd,
  onEdit,
  movie,
}) => {
  interface FormState {
    title: string;
    description: string;
    genre: string;
    duration: number;
    release_year: number;
    rating: number;
    director: string;
    main_lead: string;
    streaming_platform: string;
    poster: any;
    banner: any;
  }

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    genre: '',
    release_year: 0,
    duration: 0,
    rating: 0,
    director: '',
    main_lead: '',
    streaming_platform: '',
    poster: null,
    banner: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    release_year: '',
    duration: '',
    streaming_platform: '',
    main_lead: '',
  });

  const validPlatforms = ['Netflix', 'Amazon Prime', 'Hulu', 'Disney+', 'HBO Max'];

  useEffect(() => {
    if (movie) {
      setForm({
        ...movie,
        release_year: movie.release_year,
        duration: movie.duration,
        rating: movie.rating,
        poster: movie.poster ? { uri: movie.poster } : null,
        banner: movie.banner ? { uri: movie.banner } : null,
      });
    } else {
      setForm({
        title: '',
        description: '',
        genre: '',
        release_year: 0,
        duration: 0,
        rating: 0,
        director: '',
        main_lead: '',
        streaming_platform: '',
        poster: null,
        banner: null,
      });
    }
  }, [movie, visible]);

  const handleChange = (key: keyof FormState, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {
      title: form.title ? '' : 'Title cannot be blank',
      release_year:
        typeof form.release_year === 'number' &&
        form.release_year >= 1900 &&
        form.release_year <= new Date().getFullYear()
          ? ''
          : 'Release year must be a valid 4-digit number',
      duration: form.duration > 0 ? '' : 'Duration must be a positive integer',
      streaming_platform: validPlatforms.includes(form.streaming_platform)
        ? ''
        : 'Streaming platform is not valid',
      main_lead: form.main_lead ? '' : "Main lead can't be blank",
    };
    console.log(newErrors);
    
    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === '');
  };

  const handleImagePick = (field: 'poster' | 'banner') => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        handleChange(field, response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    console.log(form);
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    const formData = new FormData();
    formData.append('movie[title]', form.title);
    formData.append('movie[description]', form.description);
    formData.append('movie[genre]', form.genre);
    formData.append('movie[release_year]', String(form.release_year));
    formData.append('movie[duration]', String(form.duration));
    formData.append('movie[rating]', String(form.rating));
    formData.append('movie[director]', form.director);
    formData.append('movie[main_lead]', form.main_lead);
    formData.append('movie[streaming_platform]', form.streaming_platform);

    if (form.poster) {
      console.log(form.poster);      
      formData.append('movie[poster]', {
        uri: form.poster.uri,
        name: form.poster.fileName || 'poster.jpg',
        type: form.poster.type || 'image/jpeg',
      } as any);
    }

    if (form.banner) {
      console.log(form.banner);
      
      formData.append('movie[banner]', {
        uri: form.banner.uri,
        name: form.banner.fileName || 'banner.jpg',
        type: form.banner.type || 'image/jpeg',
      } as any);
    }

    try {
      console.log(movie);      
      movie && onEdit ? onEdit(movie.id, formData) : onAdd(formData);
      // console.log(movie);
      
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent testID="add-movie-modal">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.header}>{movie ? 'Edit Movie' : 'Add New Movie'}</Text>
            <Text style={styles.section}>Movie Details</Text>

            {[
              { label: 'Movie Title', key: 'title', error: errors.title },
              { label: 'Description', key: 'description' },
              { label: 'Genre', key: 'genre' },
              { label: 'Release Year', key: 'release_year', error: errors.release_year },
              { label: 'Duration (minutes)', key: 'duration', error: errors.duration },
              { label: 'Rating', key: 'rating' },
              { label: 'Director', key: 'director' },
              { label: 'Main Lead', key: 'main_lead', error: errors.main_lead },
              { label: 'Streaming Platform', key: 'streaming_platform', error: errors.streaming_platform },
            ].map(({ label, key, error }) => (
              <View key={key}>
                <TextInput
                  testID={`input-${key}`}
                  style={styles.input}
                  placeholder={`${label} *`}
                  placeholderTextColor="#aaa"
                  value={String(form[key as keyof FormState])}
                  onChangeText={text =>
                    ['release_year', 'duration', 'rating'].includes(key)
                      ? handleChange(key as keyof FormState, Number(text))
                      : handleChange(key as keyof FormState, text)
                  }
                  keyboardType={['release_year', 'duration', 'rating'].includes(key) ? 'numeric' : 'default'}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            ))}

            <Text style={styles.section}>Media Files</Text>
            <View style={styles.uploadRow}>
              <TouchableOpacity style={styles.uploadBtn} onPress={() => handleImagePick('poster')} testID="upload-poster">
                <Text style={styles.uploadText}>UPLOAD POSTER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBtn} onPress={() => handleImagePick('banner')} testID="upload-banner">
                <Text style={styles.uploadText}>UPLOAD BANNER</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imagePreviewRow}>
              {form.poster && <Image source={{ uri: form.poster.uri }} style={styles.preview} testID="poster-preview" />}
              {form.banner && <Image source={{ uri: form.banner.uri }} style={styles.preview} testID="banner-preview" />}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.addBtn} onPress={handleSubmit} testID="submit-button">
                <Text style={styles.addBtnText}>{movie ? 'UPDATE MOVIE' : 'ADD MOVIE'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose} testID="cancel-button">
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center' },
  modal: {
    backgroundColor: '#111',
    margin: 16,
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    paddingBottom: 4,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 6,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  uploadBtn: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  uploadText: { fontWeight: 'bold', color: '#000' },
  imagePreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  preview: {
    width: 120,
    height: 80,
    borderRadius: 6,
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addBtn: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  addBtnText: { fontWeight: 'bold', color: '#000' },
  cancelBtn: {
    borderColor: '#FFD700',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  cancelBtnText: { color: '#FFD700', fontWeight: 'bold' },
});

export default AddMovieModal;
