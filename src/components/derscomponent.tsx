import type { Ders } from '../interfaces/ders';

// Props (Bileşene dışarıdan gelen veriler ve fonksiyonlar)
interface Props {
  course: Ders;
  onUpdate: (id: number, delta: number) => void;
  onDelete: (id: number) => void;
}

export default function CourseItem({ course, onUpdate, onDelete }: Props) {
  return (
    <div className="course-row">
      {/* Ders Adı */}
      <span className="course-name">{course.name}</span>

      {/* Sayaç Bölümü */}
      <div className="counter">
        <button 
          onClick={() => onUpdate(course.id, -1)} 
          className="btn-counter"
        >
          -
        </button>
        
        <strong className="count-display">{course.absentCount} Gün</strong>
        
        <button 
          onClick={() => onUpdate(course.id, 1)} 
          className="btn-counter"
        >
          +
        </button>
      </div>

      {/* Silme Butonu */}
      <button 
        className="delete-btn" 
        onClick={() => onDelete(course.id)}
      >
        Sil
      </button>
    </div>
  );
}