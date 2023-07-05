import React from "react";
import { Container } from "../../components/container/Container";
import { Header } from "../../components/header/Header";
import { Check } from "phosphor-react";
import landingpage_reminder from "../../assets/images/landingpage_reminder.svg";
import { Footer } from "../../components/footer/Footer";

export const Home = () => {
  return (
    <Container>
      <Header />
      <div className="mt-6">
        <div className="flex gap-4 justify-between p-2">
          <div className="text-justify" id="product">
            <h2 className="font-sans font-semibold text-4xl mt-4 antialiased">
              Payments infrastructure
            </h2>
            <p className="font-sans text-xl mt-4 max-w-prose antialiased">
              In all the world, a thousand of people are using our solutions to
              create payments remember and automatic sending to the credors.
              With this app you can do:
            </p>
            <ul>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Create payments
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Create customers
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Create reminders
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Reminders send automatically on email and
                sms
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Generate reports
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Tracking emails
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Auto convert currencies
              </li>
              <li className="mt-4 font-sans text-base antialiased flex flex-wrap gap-2 items-center">
                <Check size={18} /> Pay directly on link received on the email
              </li>
            </ul>
            <a
              className="block font-serif text-base p-4 font-bold antialiased bg-indigo-500 w-max mt-4
            border-solid rounded transition-opacity hover:opacity-70"
              href="/login"
            >
              Start now
            </a>
          </div>
          <div>
            <img src={landingpage_reminder} alt="Reminder" />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};
