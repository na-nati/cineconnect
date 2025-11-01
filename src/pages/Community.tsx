import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Heart, MessageCircle, Star, TrendingUp, Users } from "lucide-react";

const Community = () => {
  const posts = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      movie: "The Dark Knight",
      rating: 5,
      review:
        "This film changed cinema forever. Heath Ledger's Joker is haunting and unforgettable. A true masterpiece!",
      likes: 124,
      comments: 32,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      movie: "Inception",
      rating: 5,
      review:
        "Mind-bending storytelling at its finest. The ending still keeps me thinking!",
      likes: 89,
      comments: 21,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      movie: "Interstellar",
      rating: 4,
      review:
        "Visually stunning and emotionally powerful. The soundtrack gives me chills every time.",
      likes: 156,
      comments: 45,
      time: "1 day ago",
    },
  ];

  const topRatedMovies = [
    { title: "The Godfather", rating: 9.2 },
    { title: "The Dark Knight", rating: 9.0 },
    { title: "Pulp Fiction", rating: 8.9 },
    { title: "Inception", rating: 8.8 },
  ];

  const activeUsers = [
    {
      name: "Alex Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      reviews: 156,
    },
    {
      name: "Lisa Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      reviews: 142,
    },
    {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      reviews: 128,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />

      <main className="pt-20 pb-10 container mx-auto px-4 flex flex-col lg:flex-row gap-10">
        {/* Main Feed */}
        <section className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-red-500">Community Feed</h1>

          {posts.map((post, index) => (
            <div
              key={post.id}
              className="bg-gray-900 p-6 rounded-xl border border-red-800 hover:border-red-600 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.avatar}
                  alt={post.user}
                  className="w-12 h-12 rounded-full border-2 border-red-600"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{post.user}</h3>
                      <p className="text-sm text-gray-400">
                        reviewed{" "}
                        <span className="text-red-500 font-medium">
                          {post.movie}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < post.rating
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-4">{post.review}</p>

                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Sidebar */}
        <aside className="lg:w-80 space-y-6">
          {/* Top Rated Movies */}
          <div className="bg-gray-900 p-6 rounded-xl border border-red-800">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">
                Top Rated Movies
              </h2>
            </div>
            <div className="space-y-3">
              {topRatedMovies.map((movie, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-gray-300"
                >
                  <span>{movie.title}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-red-500 fill-current" />
                    <span className="font-semibold">{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Active Users */}
          <div className="bg-gray-900 p-6 rounded-xl border border-red-800">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">
                Most Active Users
              </h2>
            </div>
            <div className="space-y-3">
              {activeUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-red-600"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">
                      {user.reviews} reviews
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
