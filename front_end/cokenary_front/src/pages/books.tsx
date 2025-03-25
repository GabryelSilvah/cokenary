import { useState } from "react";
import { Search, Eye, Calendar, Star, Pencil, Trash, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const recipeBooks = [
  {
    id: 1,
    title: "Sabores do Mundo",
    description: "Uma coleção de receitas internacionais irresistíveis.",
    category: "Internacional",
    rating: 4.8,
    date: new Date(),
    cover: "https://source.unsplash.com/800x600/?cookbook,food",
    recipes: ["Paella", "Sushi", "Tacos"]
  },
  {
    id: 2,
    title: "Delícias da Confeitaria",
    description: "Receitas doces para adoçar o dia.",
    category: "Confeitaria",
    rating: 4.5,
    date: new Date(),
    cover: "https://source.unsplash.com/800x600/?dessert,cake",
    recipes: ["Bolo de chocolate", "Macarons", "Torta de morango"]
  },
  {
    id: 3,
    title: "Culinária Fit",
    description: "Receitas saudáveis e saborosas para o dia a dia.",
    category: "Fitness",
    rating: 4.7,
    date: new Date(),
    cover: "https://hotmart.s3.amazonaws.com/product_pictures/b20253d3-4194-4042-aab5-89c4ddd6922f/imagemebook.png",
    recipes: ["Salada de quinoa", "Smoothie detox", "Panqueca proteica"]
  }
];

export default function RecipeBooksPage() {
  const [search, setSearch] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  const filteredBooks = recipeBooks.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SectionContainer>
      <PageHeader title="Livros de Receitas" description="Explore diversas coleções de receitas deliciosas." />
      
      <div className="flex gap-2 mb-4">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="p-4 flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <img src={book.cover} alt={book.title} className="w-full h-auto object-cover rounded-lg" />
              <CardTitle className="mt-2 text-center">{book.title}</CardTitle>
              <Badge variant="secondary">{book.category}</Badge>
            </CardHeader>
            <CardContent className="flex-1">
              <p>{book.description}</p>
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
                <Button size="icon" variant="outline">
                  <Pencil className="w-4 h-4" />
                </Button>
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
                      <DialogTitle>{book.title}</DialogTitle>
                    </DialogHeader>
                    <p>{book.description}</p>
                    <h3 className="font-semibold mt-4">Receitas:</h3>
                    <ul className="list-disc ml-5">
                      {book.recipes.map((recipe, index) => (
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
            <p>Tem certeza que deseja excluir o livro "{selectedBook?.title}"?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                <XCircle className="w-5 h-5 mr-2" /> Cancelar
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(false)}>
                <CheckCircle className="w-5 h-5 mr-2" /> Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionContainer>
  );
}
