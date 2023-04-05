module.exports = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/index.html",
      }
    ]
}
};
