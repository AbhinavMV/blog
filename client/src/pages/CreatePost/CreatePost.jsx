import { Container } from "@material-ui/core";

import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";

const CreatePost = ({ history }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Form
          history={history}
          edit={false}
          initialState={{
            title: "",
            message: "",
            tags: "",
            createdAt: "",
          }}
        />
      </Container>
    </>
  );
};

export default CreatePost;
