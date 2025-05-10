import { useState } from "react";
import {
  Search,
  Eye,
  Calendar,
  Star,
  Pencil,
  Trash,
  PlusCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function LivrosPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([
    {
      idLivro: 1,
      titulo: "Sabores do Mundo",
      isbn: "978-1234567890",
      FKeditor: 101,
      rating: 4.8,
      date: new Date(),
      cover: "https://m.media-amazon.com/images/I/61QlSMv9bcL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
      receitas: ["Paella", "Sushi", "Tacos"]
    },
    {
      idLivro: 2,
      titulo: "Delícias da Confeitaria",
      isbn: "978-9876543210",
      FKeditor: 102,
      rating: 4.5,
      date: new Date(),
      cover: "https://http2.mlstatic.com/D_Q_NP_642731-MLB31692164773_082019-O.webp",
      receitas: ["Bolo de chocolate", "Macarons", "Torta de morango"]
    }
  ]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  const filteredBooks = books.filter(book =>
    book.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...editingBook,
      titulo: form.titulo.value,
      isbn: form.isbn.value,
      FKeditor: parseInt(form.FKeditor.value),
      cover: form.cover.value
    };
    setBooks(books.map(b => (b.idLivro === editingBook.idLivro ? updated : b)));
    setEditingBook(null);
  };

  return (
    <SectionContainer>
      <PageHeader
        title="Livros de Receitas"
        description="Explore diversas coleções de receitas deliciosas."
      />

      <div className="flex flex-col md:flex-row gap-2 mb-4 items-start md:items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Buscar livro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Button variant="outline">
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Botão adicionar livro */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="w-5 h-5" /> Adicionar Livro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Livro</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newBook = {
                  idLivro: books.length > 0 ? books[books.length - 1].idLivro + 1 : 1,
                  FKeditor: parseInt(form.FKeditor.value),
                  titulo: form.titulo.value,
                  isbn: form.isbn.value,
                  cover: form.cover.value,
                  rating: 4.0,
                  date: new Date(),
                  receitas: []
                };
                setBooks([...books, newBook]);
                form.reset();
              }}
              className="space-y-3"
            >
              <Input name="titulo" placeholder="Título" required />
              <Input name="isbn" placeholder="ISBN" required />
              <Input name="FKeditor" type="number" placeholder="ID do Editor" required />
              <Input name="cover" placeholder="URL da Capa" required />
              <Button type="submit" className="w-full">
                Salvar Livro
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <Card key={book.idLivro} className="p-4 flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <img
                src={book.cover}
                alt={book.titulo}
                className="w-full h-48 object-contain rounded-lg" // Ajuste a altura máxima da imagem
              />
              <CardTitle className="mt-2 text-center">{book.titulo}</CardTitle>
              <Badge variant="secondary">Editor: {book.FKeditor}</Badge>
            </CardHeader>
            <CardContent className="flex-1">
              <p>ISBN: {book.isbn}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(book.date, "dd/MM/yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{book.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setEditingBook(book)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {editingBook?.idLivro === book.idLivro && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Livro</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit} className="space-y-3">
                        <Input
                          name="titulo"
                          defaultValue={editingBook.titulo}
                          required
                        />
                        <Input
                          name="isbn"
                          defaultValue={editingBook.isbn}
                          required
                        />
                        <Input
                          name="FKeditor"
                          type="number"
                          defaultValue={editingBook.FKeditor}
                          required
                        />
                        <Input
                          name="cover"
                          defaultValue={editingBook.cover}
                          required
                        />
                        <Button type="submit" className="w-full">
                          Atualizar
                        </Button>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>

                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowDeleteConfirm(true);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{book.titulo}</DialogTitle>
                    </DialogHeader>
                    <p>ISBN: {book.isbn}</p>
                    <h3 className="font-semibold mt-4">Receitas:</h3>
                    <ul className="list-disc ml-5">
                      {book.receitas.map((recipe, index) => (
                        <li key={index}>{recipe}</li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showDeleteConfirm && (
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <p>
              Tem certeza que deseja excluir o livro "{selectedBook?.titulo}"?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                <XCircle className="w-5 h-5 mr-2" /> Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setBooks(books.filter((b) => b.idLivro !== selectedBook.idLivro));
                  setShowDeleteConfirm(false);
                }}
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionContainer>
  );
}
