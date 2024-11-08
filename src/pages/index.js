
const Home  = () => {
  return null;
};
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/admin',
      permanent: false,
    },
  };
}

export default Home;
