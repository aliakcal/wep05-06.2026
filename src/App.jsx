import { useState, useEffect } from "react";
import {
  collection, addDoc, deleteDoc,
  doc, updateDoc, onSnapshot,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {

  // ---------- STATE ----------
  const [gorevler, gorevleriGuncelle]        = useState([]);
  const [yazılanMetin, yazılanMetniGuncelle] = useState("");
  const [yukleniyor, yukleniyoruGuncelle]    = useState(true);
  const [filtre, filtreGuncelle]             = useState("hepsi");

  // ---------- VERİTABANINI DİNLE ----------
  useEffect(() => {
    const sorgu = query(collection(db, "todos"), orderBy("createdAt", "desc"));

    const dinlemeyiDurdur = onSnapshot(sorgu, (anlıkVeri) => {
      gorevleriGuncelle(anlıkVeri.docs.map((belge) => ({ id: belge.id, ...belge.data() })));
      yukleniyoruGuncelle(false);
    });

    return () => dinlemeyiDurdur();
  }, []);

  // ---------- GÖREV EKLE ----------
  const gorevEkle = async (olay) => {
    olay.preventDefault();
    if (!yazılanMetin.trim()) return;

    await addDoc(collection(db, "todos"), {
      text: yazılanMetin.trim(),
      completed: false,
      createdAt: serverTimestamp(),
    });

    yazılanMetniGuncelle("");
  };

  // ---------- TAMAMLANDI / TAMAMLANMADI ----------
  const gorevDurumunuDegistir = async (id, tamamlandıMı) => {
    await updateDoc(doc(db, "todos", id), { completed: !tamamlandıMı });
  };

  // ---------- GÖREV SİL ----------
  const gorevSil = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // ---------- FİLTRELEME ----------
  const filtrelenmisGorevler = gorevler.filter((gorev) => {
    if (filtre === "aktif")      return !gorev.completed;
    if (filtre === "tamamlanan") return gorev.completed;
    return true;
  });

  // ---------- ARAYÜZ ----------
  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container" style={{ maxWidth: "620px" }}>
        <div className="card shadow-lg border-0 rounded-4">

          <div
            className="card-header border-0 rounded-top-4 py-4 text-center"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            <h1 className="text-white fw-bold mb-0">📝 Görev Takip</h1>
            <p className="text-white opacity-75 mb-0 mt-1 small">
              Vite + React + Bootstrap + Firebase
            </p>
          </div>

          <div className="card-body p-4">

            <div className="row g-2 mb-4">
              {[
                { etiket: "Toplam",     sayi: gorevler.length,                             color: "primary" },
                { etiket: "Aktif",      sayi: gorevler.filter((g) => !g.completed).length, color: "warning" },
                { etiket: "Tamamlanan", sayi: gorevler.filter((g) => g.completed).length,  color: "success" },
              ].map((istatistik) => (
                <div key={istatistik.etiket} className="col-4">
                  <div className={`bg-${istatistik.color} bg-opacity-10 rounded-3 p-3 text-center`}>
                    <div className={`fw-bold fs-4 text-${istatistik.color}`}>{istatistik.sayi}</div>
                    <div className="small text-muted">{istatistik.etiket}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={gorevEkle} className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Yeni görev ekle..."
                  value={yazılanMetin}
                  onChange={(olay) => yazılanMetniGuncelle(olay.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none" }}
                >
                  + Ekle
                </button>
              </div>
            </form>

            <div className="btn-group w-100 mb-4">
              {["hepsi", "aktif", "tamamlanan"].map((filtreSecenegi) => (
                <button
                  key={filtreSecenegi}
                  className={`btn ${filtre === filtreSecenegi ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => filtreGuncelle(filtreSecenegi)}
                  style={filtre === filtreSecenegi ? { background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none" } : {}}
                >
                  {filtreSecenegi.charAt(0).toUpperCase() + filtreSecenegi.slice(1)}
                </button>
              ))}
            </div>

            {yukleniyor ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" />
                <p className="text-muted mt-2">Yükleniyor...</p>
              </div>
            ) : filtrelenmisGorevler.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <div style={{ fontSize: "2.5rem" }}>📭</div>
                <p>Görev yok</p>
              </div>
            ) : (
              <ul className="list-unstyled">
                {filtrelenmisGorevler.map((gorev) => (
                  <li key={gorev.id} className="d-flex align-items-center p-3 mb-2 bg-white rounded-3 shadow-sm border">
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={gorev.completed}
                      onChange={() => gorevDurumunuDegistir(gorev.id, gorev.completed)}
                      style={{ width: "1.2em", height: "1.2em" }}
                    />
                    <span className={`flex-grow-1 ${gorev.completed ? "text-decoration-line-through text-muted" : "fw-medium"}`}>
                      {gorev.text}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => gorevSil(gorev.id)}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
