
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Utensils, Users, Building, Briefcase, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  // Dados simulados das melhores comidas
  const topRecipes = [
    {
      id: "1",
      title: "Caramelized Salmon",
      description: "Pan-seared salmon with a sweet and savory glaze",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      rating: 4.8,
      chef: "Chef Marcelo"
    },
    {
      id: "2",
      title: "Truffle Risotto",
      description: "Creamy Arborio rice with fresh truffles and parmesan",
      image: "https://images.unsplash.com/photo-1676037150908-b4bce2ae990f",
      rating: 4.9,
      chef: "Chef Isabella"
    },
    {
      id: "3",
      title: "Citrus Tart",
      description: "Bright lemon and orange flavors in a buttery crust",
      image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81",
      rating: 4.7,
      chef: "Chef Paulo"
    }
  ];

  // Dados simulados dos melhores restaurantes
  const topRestaurants = [
    {
      id: "1",
      name: "Saveur",
      description: "Culinária francesa contemporânea e elegante",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.9,
      location: "São Paulo, SP"
    },
    {
      id: "2",
      name: "Fusion House",
      description: "Combinando o melhor da gastronomia asiática e europeia",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      rating: 4.8,
      location: "Rio de Janeiro, RJ"
    },
    {
      id: "3",
      name: "Sabor do Mar",
      description: "Os melhores frutos do mar da região",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      rating: 4.7,
      location: "Florianópolis, SC"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Versão diferente para usuários logados */}
      <section className="relative w-full h-[75vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={user ? "https://images.unsplash.com/photo-1504674900247-0877df9cc836" : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"}
            alt="Culinary background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 z-10 animate-fade-in">
          <div className="max-w-2xl">
            {user ? (
              <>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  Bem-vindo, {user.name}!
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Descubra novas receitas, restaurantes e oportunidades culinárias. O que você deseja explorar hoje?
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  Connect, Create, Culinary
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Discover amazing recipes, connect with restaurants, find culinary jobs, and build your career in the food industry.
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="dark:text-white text-black border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10"
                asChild
              >
                <Link to="/jobs">Find Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Melhores Receitas - Apenas para usuários logados */}
      {user && (
        <SectionContainer className="py-16 bg-secondary/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Receitas em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              As receitas mais bem avaliadas pela nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md flex items-center text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-current" /> {recipe.rating}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {recipe.title}
                    {recipe.rating >= 4.8 && (
                      <span className="inline-flex items-center text-amber-500">
                        <Award className="h-5 w-5 mr-1" /> Top
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <span className="block text-sm">{recipe.chef}</span>
                    {recipe.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver Receita</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Seção de Melhores Restaurantes - Apenas para usuários logados */}
      {user && (
        <SectionContainer className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Restaurantes em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça os restaurantes mais bem avaliados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md flex items-center text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-current" /> {restaurant.rating}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {restaurant.name}
                    {restaurant.rating >= 4.8 && (
                      <span className="inline-flex items-center text-amber-500">
                        <Award className="h-5 w-5 mr-1" /> Premium
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <span className="block text-sm">{restaurant.location}</span>
                    {restaurant.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver Restaurante</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Features Section */}
      <SectionContainer className={`py-20 ${user ? 'bg-secondary/30 border-y' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything for Culinary Professionals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive platform designed for everyone in the culinary industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Recipes",
              description: "Discover and share culinary masterpieces from professionals worldwide",
              icon: <ChefHat className="h-10 w-10 text-primary" />,
              link: "/recipes"
            },
            {
              title: "Restaurants",
              description: "Connect with top dining establishments looking for talent",
              icon: <Building className="h-10 w-10 text-primary" />,
              link: "/restaurants"
            },
            {
              title: "Employees",
              description: "Find skilled culinary professionals for your establishment",
              icon: <Users className="h-10 w-10 text-primary" />,
              link: "/employees"
            },
            {
              title: "Jobs",
              description: "Browse opportunities from leading restaurants and caterers",
              icon: <Briefcase className="h-10 w-10 text-primary" />,
              link: "/jobs"
            }
          ].map((feature, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-6">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={feature.link}>
                    Explore {feature.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Featured Recipes - Apenas para usuários não logados */}
      {!user && (
        <SectionContainer className="bg-secondary/30 border-y py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Recipes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of exceptional culinary creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Caramelized Salmon",
                description: "Pan-seared salmon with a sweet and savory glaze",
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
              },
              {
                title: "Truffle Risotto",
                description: "Creamy Arborio rice with fresh truffles and parmesan",
                image: "https://images.unsplash.com/photo-1676037150908-b4bce2ae990f"
              },
              {
                title: "Citrus Tart",
                description: "Bright lemon and orange flavors in a buttery crust",
                image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81"
              }
            ].map((recipe, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Recipe</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/recipes">View All Recipes</Link>
            </Button>
          </div>
        </SectionContainer>
      )}

      {/* CTA Section - Apenas para usuários não logados */}
      {!user && (
        <SectionContainer className="py-24">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join Our Culinary Community</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Create an account to save favorite recipes, apply for jobs, and connect with restaurants
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </SectionContainer>
      )}
    </div>
  );
};

export default Home;
