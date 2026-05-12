import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArtistSongs = () => {
  const { artistId } = useParams();
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTracks, setLoadingTracks] = useState({});
  const [tracks, setTracks] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!artistId) {
      setLoading(false);
      return;
    }

    console.log('=== Cargando releases para artistId:', artistId);

    axios.get(`/api-music/ws/2/release?artist=${artistId}&limit=25&fmt=json`)
      .then((response) => {
        console.log('✅ Releases response:', response.data);
        const releaseList = response.data.releases || [];
        console.log('📦 Releases encontrados:', releaseList.length);
        setReleases(releaseList);
        
        // Obtener canciones para cada lanzamiento
        if (releaseList.length > 0) {
          releaseList.forEach((release, index) => {
            console.log(`📀 [${index + 1}/${releaseList.length}] Cargando tracks para release:`, release.id, release.title);
            fetchTracks(release.id, release.title);
          });
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error fetching releases:', error);
        setError('Error al cargar los lanzamientos');
        setLoading(false);
      });
  }, [artistId]);

  const fetchTracks = async (releaseId, releaseTitle) => {
    try {
      // Marcar como cargando
      setLoadingTracks(prev => ({
        ...prev,
        [releaseId]: true
      }));

      console.log(`⏳ [${releaseTitle}] Obteniendo recordings desde MusicBrainz...`);
      
      // Usar el endpoint correcto con media incluido
      const url = `/api-music/ws/2/release/${releaseId}?inc=recordings+media&fmt=json`;
      console.log('   URL:', url);
      
      const response = await axios.get(url);
      
      console.log(`📊 [${releaseTitle}] Respuesta recibida:`, response.data);

      let recordingsList = [];
      
      // Intentar obtener recordings de diferentes formas
      if (response.data.media && response.data.media.length > 0) {
        console.log(`   ✓ Encontrados ${response.data.media.length} medios (CD/LP/etc)`);
        
        // Concatenar todas las pistas de todos los medios
        response.data.media.forEach((medium, mediumIndex) => {
          console.log(`     Medio ${mediumIndex + 1}: ${medium.tracks?.length || 0} pistas`);
          if (medium.tracks && medium.tracks.length > 0) {
            recordingsList = recordingsList.concat(medium.tracks);
          }
        });
      } else if (response.data.recordings && response.data.recordings.length > 0) {
        console.log(`   ✓ Encontradas ${response.data.recordings.length} grabaciones directas`);
        recordingsList = response.data.recordings;
      } else {
        console.log(`   ⚠️ No se encontraron pistas en la respuesta`);
        console.log('   Estructura de respuesta:', Object.keys(response.data));
      }

      console.log(`✅ [${releaseTitle}] Total de pistas procesadas: ${recordingsList.length}`);
      
      setTracks(prev => ({
        ...prev,
        [releaseId]: recordingsList
      }));

      // Marcar como completado
      setLoadingTracks(prev => ({
        ...prev,
        [releaseId]: false
      }));
    } catch (error) {
      console.error(`❌ Error fetching tracks para ${releaseTitle}:`, error.message);
      console.error('   Error completo:', error);
      setLoadingTracks(prev => ({
        ...prev,
        [releaseId]: false
      }));
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h2>Cargando lanzamientos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <Link to={`/artist/${artistId}`} style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          ← Volver al artista
        </Link>
        <div style={{ padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Link to={`/artist/${artistId}`} style={{ display: 'inline-block', marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        ← Volver al artista
      </Link>

      <h2>Lanzamientos y Canciones</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Total de lanzamientos: <strong>{releases.length}</strong></p>
      
      {releases.length > 0 ? (
        <div>
          {releases.map((release, releaseIndex) => {
            const trackList = tracks[release.id] || [];
            const isLoadingTracks = loadingTracks[release.id];

            return (
              <div key={release.id} style={{ marginBottom: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#666', fontSize: '14px', marginRight: '10px', backgroundColor: '#e7f3ff', padding: '2px 8px', borderRadius: '4px' }}>
                    [{releaseIndex + 1}]
                  </span>
                  <span style={{ flex: 1 }}>
                    {release.title}
                  </span>
                  {release.date && <span style={{ color: '#666', fontSize: '14px', marginLeft: 'auto' }}>({release.date.substring(0, 4)})</span>}
                </h3>
                
                {isLoadingTracks ? (
                  <div style={{ padding: '10px', color: '#0066cc' }}>
                    <span>⏳ Cargando canciones...</span>
                  </div>
                ) : trackList.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: '0', margin: '10px 0' }}>
                    {trackList.map((track, trackIndex) => {
                      // Extraer el título de la canción
                      let songTitle = '';
                      let trackId = '';
                      
                      if (track.recording && track.recording.id) {
                        // Si es del formato media.tracks
                        trackId = track.recording.id;
                        songTitle = track.recording.title || track.title || 'Sin título';
                      } else if (track.id) {
                        // Si es del formato recordings directo
                        trackId = track.id;
                        songTitle = track.title || 'Sin título';
                      }

                      return (
                        <li 
                          key={trackId || trackIndex} 
                          style={{ 
                            padding: '10px', 
                            background: 'white', 
                            marginBottom: '8px', 
                            borderRadius: '5px', 
                            border: '1px solid #eee',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#e7f3ff';
                            e.currentTarget.style.borderColor = '#0066cc';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#eee';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          {trackId ? (
                            <Link 
                              to={`/song/${artistId}/${trackId}`}
                              style={{ 
                                textDecoration: 'none',
                                color: '#0066cc',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '5px',
                                cursor: 'pointer'
                              }}
                            >
                              <span style={{ fontSize: '16px', marginRight: '10px', minWidth: '30px' }}>
                                ▶
                              </span>
                              <span style={{ flex: 1 }}>
                                {trackIndex + 1}. {songTitle}
                              </span>
                              {track.length && (
                                <span style={{ color: '#999', marginLeft: '10px', fontSize: '12px', minWidth: '50px', textAlign: 'right' }}>
                                  {Math.floor(track.length / 1000 / 60)}:{String(Math.floor((track.length / 1000) % 60)).padStart(2, '0')}
                                </span>
                              )}
                            </Link>
                          ) : (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              padding: '5px',
                              color: '#999'
                            }}>
                              <span style={{ fontSize: '16px', marginRight: '10px', minWidth: '30px' }}>
                                ℹ️
                              </span>
                              <span style={{ flex: 1 }}>
                                {trackIndex + 1}. {songTitle} (Sin ID disponible)
                              </span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p style={{ color: '#999', marginLeft: '10px', fontStyle: 'italic' }}>
                    ℹ️ No hay canciones disponibles para este lanzamiento
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ color: '#999', fontSize: '16px' }}>No se encontraron lanzamientos para este artista</p>
      )}
    </div>
  );
};

export default ArtistSongs;
