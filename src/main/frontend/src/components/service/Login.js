import React from "react";
import { signin } from "./SignAPIService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container, Link } from "@material-ui/core";
import "../../styles/global.css"

class Login extends React.Component {
  constructor(props) {
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        // ApiService의 signin 메서드를 사용 해 로그인.
        signin({ email: email, password: password });
      }

      render() {
        const customh1= {
          color: "black",
        textAlign: "center",
        fontSize: '30px',
        fontWeight: 'bold',
        };
        return (
          <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ fontSize: '30px', textAlign:'center', fontWeight:'bold' }}
                component="h1" variant="h5">
                  로그인
                </Typography><br/>
              </Grid><br/>
            </Grid>
            <form noValidate onSubmit={this.handleSubmit}>
              {" "}
              {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="이메일을 입력하세요"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호 설정"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="saveButton"
                    type="submit"
                    fullWidth
                    variant="contained"
                    >
                    로그인
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end" style={{marginTop : 20}}>
                  <Link className="necessarytext" href="/signup" variant="body2">
                    <Grid item>계정이 없으신가요? 회원가입</Grid>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        );
      }
    }
    
    

export default Login;