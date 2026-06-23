/**
 * About Page — /sobre
 * Design: Charcoal & Gold Prestige
 */

import { Shield, Award, Users, TrendingUp, CheckCircle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Header />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 overflow-hidden"
        style={{ background: "oklch(0.12 0.005 60)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 75), transparent)",
            filter: "blur(80px)",
          }}
        />
        <div className="container relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
              Nossa História
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-semibold text-[#F5F0E8] mb-6 max-w-2xl leading-tight"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Mais de uma década no mercado imobiliário
          </h1>
          <p className="text-[#9A9A8A] text-lg leading-relaxed max-w-xl">
            Fundada em 2013, a ImóvelPrime nasceu com o propósito de transformar a
            experiência de compra, venda e locação de imóveis no Brasil.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2
                className="text-3xl font-semibold text-[#F5F0E8] mb-6"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Quem somos
              </h2>
              <div className="gold-line-left mb-6" />
              <p className="text-[#9A9A8A] leading-relaxed mb-4">
                A <strong className="text-[#F5F0E8]">ImóvelPrime</strong> é uma imobiliária
                especializada em locação e venda de imóveis residenciais e comerciais. Com
                mais de 10 anos de experiência no mercado, nossa equipe de corretores
                certificados está pronta para encontrar o imóvel ideal para você.
              </p>
              <p className="text-[#9A9A8A] leading-relaxed mb-4">
                Atuamos com total transparência, segurança jurídica e agilidade em cada
                etapa do processo. Nosso compromisso é com a satisfação completa de cada
                cliente, seja na compra, venda ou locação.
              </p>
              <p className="text-[#9A9A8A] leading-relaxed">
                Nossa equipe é formada por profissionais certificados pelo CRECI, com
                profundo conhecimento do mercado local e das melhores práticas do setor
                imobiliário. Cada transação é conduzida com ética, profissionalismo e
                dedicação total ao cliente.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776255515/Y24dj4zK4qnVXuNjCoSvoL/about-office-SNFKq5BH9U7WSh85zNa8Go.webp"
                alt="Escritório ImóvelPrime"
                className="rounded-xl w-full object-cover"
                style={{
                  aspectRatio: "4/3",
                  border: "1px solid oklch(0.72 0.12 75 / 25%)",
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
            {[
              { value: "500+", label: "Imóveis negociados" },
              { value: "98%", label: "Clientes satisfeitos" },
              { value: "10+", label: "Anos de experiência" },
              { value: "15", label: "Corretores especializados" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl text-center"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 20%)",
                }}
              >
                <div
                  className="text-4xl font-bold text-[#C9A84C] mb-2"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#9A9A8A] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "Missão",
                text: "Conectar pessoas aos seus imóveis ideais com transparência, agilidade e segurança jurídica, proporcionando a melhor experiência no mercado imobiliário.",
              },
              {
                title: "Visão",
                text: "Ser reconhecida como a imobiliária de referência em atendimento premium e resultados consistentes para clientes e parceiros.",
              },
              {
                title: "Valores",
                text: "Ética, transparência, comprometimento, inovação e excelência no atendimento são os pilares que guiam todas as nossas ações.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 20%)",
                }}
              >
                <h3
                  className="text-xl font-semibold text-[#C9A84C] mb-3"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#9A9A8A] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Differentials */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-semibold text-[#F5F0E8] mb-3"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Por que escolher a ImóvelPrime
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Users size={22} />, title: "Atendimento Personalizado", desc: "Cada cliente recebe atenção exclusiva e dedicada." },
              { icon: <Shield size={22} />, title: "Segurança Jurídica", desc: "Documentação verificada e acompanhada por especialistas." },
              { icon: <Award size={22} />, title: "Especialistas em Locação", desc: "Mais de 10 anos de experiência em locação e venda." },
              { icon: <TrendingUp size={22} />, title: "Avaliação de Imóveis", desc: "Avaliação precisa baseada no mercado atual." },
              { icon: <CheckCircle size={22} />, title: "Suporte Completo", desc: "Acompanhamento em todas as etapas da negociação." },
              { icon: <Clock size={22} />, title: "Agilidade no Atendimento", desc: "Resposta rápida e eficiente em todos os canais." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 20%)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 text-[#C9A84C]"
                  style={{ background: "oklch(0.72 0.12 75 / 12%)" }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-base font-semibold text-[#F5F0E8] mb-2"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#9A9A8A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
