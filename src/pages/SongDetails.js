import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SongDetails = () => {
  const { artistId, songId } = useParams();
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSongData();
  }, [artistId, songId]);

  const loadSongData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('=== Cargando detalles de canción ===');
      console.log('songId:', songId);
      console.log('artistId:', artistId);

      // Paso 1: Obtener detalles de la canción de MusicBrainz
      console.log('Paso 1: Obteniendo detalles de MusicBrainz...');
      const songResponse = await axios.get(
        `/api-music/ws/2/recording/${songId}?inc=artists+releases&fmt=json`
      );
      
      console.log('Respuesta de MusicBrainz:', songResponse.data);
      setSong(songResponse.data);

      // Extraer título
      const title = songResponse.data.title || '';
      console.log('Título obtenido:', title);
      setSongTitle(title);

      // Extraer artista - intentar múltiples fuentes
      let artist = '';
      if (songResponse.data['artist-credit'] && songResponse.data['artist-credit'].length > 0) {
        artist = songResponse.data['artist-credit'][0].name;
      } else if (songResponse.data.artists && songResponse.data.artists.length > 0) {
        artist = songResponse.data.artists[0].name;
      }
      
      console.log('Artista obtenido:', artist);
      setArtistName(artist);

      // Paso 2: Buscar letra en Vagalume
      if (title) {
        console.log('Paso 2: Buscando letra en Vagalume...');
        console.log('Parámetros de búsqueda - art:', artist, 'mus:', title);
        
        try {
          // Primera opción: buscar con el artista y título
          const vagalumeUrl = `/api-vagalume/song.php?apikey=660a4395f992ff67786584e238f501aa&art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(title)}`;
          console.log('URL de Vagalume:', vagalumeUrl);
          
          const lyricResponse = await axios.get(vagalumeUrl);
          console.log('Respuesta de Vagalume:', lyricResponse.data);

          if (lyricResponse.data && lyricResponse.data.lyrics) {
            console.log('Letra encontrada!');
            setLyrics(lyricResponse.data.lyrics);
          } else if (lyricResponse.data && lyricResponse.data.mus && lyricResponse.data.mus.length > 0) {
            // Si devuelve un array de canciones, tomar la primera
            console.log('Múltiples resultados encontrados');
            const firstSong = lyricResponse.data.mus[0];
            if (firstSong.url) {
              // Obtener la letra del primer resultado
              const urlParts = firstSong.url.split('/');
              const songUrlName = urlParts[urlParts.length - 1];
              const artistUrlName = urlParts[urlParts.length - 2];
              console.log('Intentando con URL:', artistUrlName, '/', songUrlName);
              
              const detailedResponse = await axios.get(
                `/api-vagalume/song/${artistUrlName}/${songUrlName}/index.php?apikey=660a4395f992ff67786584e238f501aa`
              );
              if (detailedResponse.data && detailedResponse.data.lyrics) {
                setLyrics(detailedResponse.data.lyrics);
              }
            }
          } else {
            console.log('No se encontró letra en Vagalume');
            setLyrics('');
          }
        } catch (vagalumeError) {
          console.log('Error buscando en Vagalume:', vagalumeError.message);
          setLyrics('');
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error cargando datos de la canción:', error);
      setError('Error al cargar la canción. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2>Cargando información de la canción...</h2>
        <p>Por favor espera mientras obtenemos los detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Link to={`/artist/${artistId}/songs`} style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          ← Volver a lanzamientos
        </Link>
        <div style={{ padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to={`/artist/${artistId}/songs`} style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        ← Volver a lanzamientos
      </Link>

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1>{songTitle || 'Canción sin título'}</h1>
        <p style={{ fontSize: '18px', color: '#666' }}><strong>Artista:</strong> {artistName || 'Artista desconocido'}</p>
        
        {/* Enlaces para escuchar */}
        <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Escuchar en plataformas:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            <a 
              href={`https://www.spotify.com/search/${encodeURIComponent(songTitle + ' ' + artistName)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '10px 20px', background: '#1DB954', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
            >
              🎵 Spotify
            </a>
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle + ' ' + artistName)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '10px 20px', background: '#FF0000', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
            >
              ▶ YouTube
            </a>
            <a 
              href={`https://www.vagalume.com.br/search?q=${encodeURIComponent(songTitle + ' ' + artistName)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '10px 20px', background: '#FF9900', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
            >
              🎸 Vagalume
            </a>
          </div>
        </div>
      </div>

      {/* Letra de la canción */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>Letra de la canción</h2>
        {lyrics ? (
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: '1.8', 
            fontSize: '16px',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            marginTop: '15px',
            padding: '15px',
            background: '#f9f9f9',
            borderRadius: '5px',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {lyrics}
          </div>
        ) : (
          <p style={{ color: '#999', marginTop: '15px' }}>
            Letra no disponible en este momento. 
            <br />
            <strong>Prueba escuchando en:</strong> Spotify, YouTube o Vagalume usando los botones arriba.
          </p>
        )}
      </div>

      {/* Información adicional de la canción */}
      {song && song.releases && song.releases.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Disponible en:</h3>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            {song.releases.slice(0, 3).map(release => (
              <li key={release.id}>
                <strong>{release.title}</strong> ({release.date || 'Fecha desconocida'})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongDetails;
