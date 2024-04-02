import styles from './page.module.css';

function RegisterPage(): JSX.Element {
  return (
    <main className='o-page-container'>
      {/* <form onSubmit={handleSubmit} > */}
      <form className={styles.registerForm} >
        <h1>Register your account</h1>

        <label className={styles.registerForm__label}>Fullname</label>
        <input
          className={styles.registerForm__input}
          type="text"
          placeholder="Fullname"
          name="fullname"
        />

        <label className={styles.registerForm__label}>Email</label>
        <input
          className={styles.registerForm__input}
          type="email"
          placeholder="Email"
          name="email"
        />

        <label className={styles.registerForm__label}>Password</label>
        <input
          className={styles.registerForm__input}
          type="password"
          placeholder="Password"
          name="password"
        />

        <button className={styles.registerForm__button}>
          Signup
        </button>
      </form>
    </main>
  );
}

export default RegisterPage; 
