
const Home  = () => {
  return null;
};
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  };
}

export default Home;
