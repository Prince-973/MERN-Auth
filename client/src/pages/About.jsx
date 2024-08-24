import React from "react";

function About() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">About Us</h1>
      <p className="mb-4 text-slate-700">
        The authentication boilerplate code provides a foundational setup for
        integrating secure user authentication into web applications. It
        includes essential features such as user registration, login, logout,
        and password recovery. The boilerplate is designed to be flexible and
        easy to integrate, supporting various authentication methods, including
        JWT (JSON Web Tokens), OAuth, and traditional session-based
        authentication. It follows best practices for security, such as hashing
        passwords with bcrypt and protecting routes with middleware. This
        boilerplate serves as a reliable starting point for developers looking
        to implement a robust and scalable authentication system quickly.
      </p>
    </div>
  );
}

export default About;
