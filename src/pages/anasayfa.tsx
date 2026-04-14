import { useState } from 'react';
import type { Ders } from '../interfaces/ders';
import CourseItem from '../components/derscomponent'; // Dosya yolunu kontrol et

// Sıralama tiplerini buraya ekledik
type SortType = 'A-Z' | 'Z-A' | 'cok-devamsizlik' | 'az-devamsizlik';

export default function HomePage() {
  const [courses, setCourses] = useState<Ders[]>([]);
  const [name, setName] = useState('');

  const addCourse = () => {
    if (!name) return;
    setCourses([...courses, { id: Date.now(), name, absentCount: 0 }]);
    setName('');
  };

  const updateAbsence = (id: number, delta: number) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, absentCount: Math.max(0, c.absentCount + delta) } : c
    ));
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Liste Yenileme Fonksiyonu
  const refreshList = () => {
    // Listeyi olduğu gibi tutar ama kullanıcıya bilgi verir
    alert("Liste güncellendi!");
  };

  // Sıralama Mantığı
  const sortCourses = (type: SortType) => {
    const sorted = [...courses];
    switch (type) {
      case 'A-Z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'cok-devamsizlik':
        sorted.sort((a, b) => b.absentCount - a.absentCount);
        break;
      case 'az-devamsizlik':
        sorted.sort((a, b) => a.absentCount - b.absentCount);
        break;
    }
    setCourses(sorted);
  };

  return (
    <div className="container">
      <h1>Ders Devamsızlık Takip</h1>
      
      <div className="input-box">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ders adı girin..." 
        />
        <button onClick={addCourse}>Ekle</button>
      </div>

      {/* Kontrol Paneli (Butonlar) */}
      {courses.length > 0 && (
        <div className="sort-controls">
          <button className="sort-btn" onClick={() => sortCourses('A-Z')}>A-Z</button>
          <button className="sort-btn" onClick={() => sortCourses('Z-A')}>Z-A</button>
          <button className="sort-btn" onClick={() => sortCourses('cok-devamsizlik')}>En Çok</button>
          <button className="sort-btn" onClick={() => sortCourses('az-devamsizlik')}>En Az</button>
          
          <button 
            className="sort-btn refresh-btn" 
            onClick={refreshList}
            title="Listeyi Güncelle"
          >
            🔄
          </button>
        </div>
      )}

      <div className="list">
        {courses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Henüz ders eklenmedi.</p>
        ) : (
          courses.map(course => (
            <CourseItem 
              key={course.id} 
              course={course} 
              onUpdate={updateAbsence} 
              onDelete={deleteCourse} 
            />
          ))
        )}
      </div>
    </div>
  );
}