import React, { useMemo, useState } from "react";

const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfH60S8W6OYIM1s93VJqphysJyCNMtPQWrF5nZ3yGNY_lHcOQ/formResponse";

const FORM_ENTRY_IDS = {
  name: "entry.2027673160",
  phone: "entry.496474000",
  region: "entry.1620972243",
  businessType: "entry.1761406086",
  storeName: "entry.1225556865",
  monthlySales: "entry.2065132234",
};

const initialForm = {
  name: "",
  phone: "",
  region: "",
  businessType: "",
  storeName: "",
  monthlySales: "",
};

const businessTypes = [
  "음식점/카페",
  "미용/뷰티",
  "소매/편의점",
  "학원/교육",
  "병원/의원",
  "온라인 쇼핑몰",
  "숙박/여행",
  "기타",
];

const salesRanges = [
  "1,000만 원 미만",
  "1,000만 원 ~ 3,000만 원",
  "3,000만 원 ~ 5,000만 원",
  "5,000만 원 ~ 1억 원",
  "1억 원 이상",
];

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px 16px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at top, #f8fafc 0%, #eef2f7 42%, #e2e8f0 100%)",
    color: "#0f172a",
    fontFamily:
      "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  wrapper: {
    width: "100%",
    maxWidth: 430,
    margin: "0 auto",
  },
  card: {
    overflow: "hidden",
    borderRadius: 30,
    background: "rgba(255,255,255,0.94)",
    boxShadow: "0 24px 60px rgba(148,163,184,0.38)",
    border: "1px solid rgba(226,232,240,0.95)",
  },
  formInner: {
    padding: 22,
  },
  title: {
    margin: "0 0 20px",
    fontSize: 22,
    lineHeight: 1.25,
    letterSpacing: "-0.04em",
    fontWeight: 900,
  },
  form: {
    display: "grid",
    gap: 16,
  },
  label: {
    display: "block",
  },
  labelText: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 800,
    color: "#334155",
  },
  icon: {
    width: 23,
    height: 23,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    background: "#f1f5f9",
    fontSize: 13,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    background: "#ffffff",
    padding: "14px 15px",
    fontSize: 15,
    color: "#0f172a",
    outline: "none",
    boxShadow: "0 1px 0 rgba(15,23,42,0.02)",
  },
  agreeBox: {
    display: "flex",
    gap: 12,
    padding: 15,
    borderRadius: 18,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  checkbox: {
    width: 16,
    height: 16,
    marginTop: 3,
    flexShrink: 0,
  },
  agreeText: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.65,
    color: "#64748b",
  },
  button: {
    width: "100%",
    height: 56,
    border: "none",
    borderRadius: 18,
    background: "#020617",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 16px 34px rgba(15,23,42,0.24)",
  },
  buttonDisabled: {
    background: "#cbd5e1",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  success: {
    padding: "13px 15px",
    borderRadius: 18,
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
    color: "#047857",
    fontSize: 13,
    fontWeight: 800,
  },
  error: {
    padding: "13px 15px",
    borderRadius: 18,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: 800,
  },
  section: {
    marginTop: 14,
    padding: 20,
    borderRadius: 28,
    background: "rgba(255,255,255,0.94)",
    border: "1px solid rgba(226,232,240,0.95)",
    boxShadow: "0 16px 38px rgba(148,163,184,0.22)",
  },
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: "-0.03em",
  },
  faqList: {
    display: "grid",
    gap: 10,
  },
  faqItem: {
    padding: 15,
    borderRadius: 18,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  question: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.45,
    fontWeight: 900,
    color: "#1e293b",
  },
  answer: {
    margin: "7px 0 0",
    fontSize: 12,
    lineHeight: 1.65,
    color: "#64748b",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  infoTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 900,
  },
  infoText: {
    margin: "8px 0 0",
    fontSize: 12,
    lineHeight: 1.7,
    color: "#64748b",
  },
  footer: {
    padding: "22px 14px 0",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 1.7,
    color: "#94a3b8",
  },
};

function Field({ icon, label, name, value, onChange, placeholder, type = "text", children }) {
  return (
    <label style={styles.label}>
      <span style={styles.labelText}>
        <span style={styles.icon}>{icon}</span>
        {label}
      </span>
      {children ? (
        children
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={styles.input}
        />
      )}
    </label>
  );
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");

  const isReady = useMemo(() => {
    return Object.values(form).every(Boolean) && agreed;
  }, [form, agreed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isReady) return;

    setStatus("loading");

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
      source: "profile-link-landing",
    };

    try {
      const formData = new FormData();

      formData.append(FORM_ENTRY_IDS.name, form.name);
      formData.append(FORM_ENTRY_IDS.phone, form.phone);
      formData.append(FORM_ENTRY_IDS.region, form.region);
      formData.append(FORM_ENTRY_IDS.businessType, form.businessType);
      formData.append(FORM_ENTRY_IDS.storeName, form.storeName);
      formData.append(FORM_ENTRY_IDS.monthlySales, form.monthlySales);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setStatus("success");
      setForm(initialForm);
      setAgreed(false);
    } catch (error) {
      console.error(error);
      setStatus("error");
    } 
  };

  return (
    <main style={styles.page}>
      <div style={styles.wrapper}>
        <section style={styles.card}>
          <div style={styles.formInner}>
            <h2 style={styles.title}>상담 정보 입력</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <Field
                icon="👤"
                label="이름"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="예: 김민수"
              />

              <Field
                icon="📞"
                label="전화번호"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="예: 010-1234-5678"
                type="tel"
              />

              <Field
                icon="📍"
                label="지역"
                name="region"
                value={form.region}
                onChange={handleChange}
                placeholder="예: 서울 강남구"
              />

              <Field icon="🏪" label="업종" name="businessType" value={form.businessType} onChange={handleChange}>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">업종을 선택해주세요</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </Field>

              <Field
                icon="🏢"
                label="상호명"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                placeholder="예: 성준카페"
              />

              <Field icon="📈" label="월 매출액" name="monthlySales" value={form.monthlySales} onChange={handleChange}>
                <select
                  name="monthlySales"
                  value={form.monthlySales}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">월 매출액을 선택해주세요</option>
                  {salesRanges.map((sales) => (
                    <option key={sales} value={sales}>{sales}</option>
                  ))}
                </select>
              </Field>

              <label style={styles.agreeBox}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={styles.checkbox}
                />
                <p style={styles.agreeText}>
                  개인정보 수집 및 이용에 동의합니다. 입력 정보는 상담 가능 여부 확인과 연락 목적으로만 사용되며, 제3자에게 임의 제공되지 않습니다.
                </p>
              </label>

              {status === "success" && (
                <div style={styles.success}>
                  상담 신청이 접수되었습니다. 담당자가 순차적으로 연락드립니다.
                </div>
              )}

              {status === "error" && (
                <div style={styles.error}>
                  접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
                </div>
              )}

              <button
                type="submit"
                disabled={!isReady || status === "loading"}
                style={{
                  ...styles.button,
                  ...(!isReady || status === "loading" ? styles.buttonDisabled : {}),
                }}
              >
                {status === "loading" ? "접수 중..." : "상담 신청하기 →"}
              </button>
            </form>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionTitleRow}>
            <span style={styles.icon}>?</span>
            <h3 style={styles.sectionTitle}>자주 묻는 질문</h3>
          </div>

          <div style={styles.faqList}>
            {[
              ["상담 신청하면 바로 진행해야 하나요?", "아닙니다. 가능 여부와 방향을 먼저 안내드린 뒤, 진행 여부는 직접 선택하시면 됩니다."],
              ["월 매출액은 왜 필요한가요?", "업종과 매출 규모에 따라 안내 가능한 방식이 달라지기 때문에 기본 확인용으로만 사용됩니다."],
              ["전화는 언제 오나요?", "접수 순서에 따라 담당자가 순차적으로 연락드립니다."],
            ].map(([question, answer]) => (
              <div key={question} style={styles.faqItem}>
                <p style={styles.question}>Q. {question}</p>
                <p style={styles.answer}>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.infoRow}>
            <span style={styles.icon}>⏱</span>
            <div>
              <p style={styles.infoTitle}>운영 정보</p>
              <p style={styles.infoText}>
                운영: 상담 운영팀<br />
                문의: 010-0000-0000<br />
                상담 가능 시간: 평일 10:00–18:00
              </p>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          본 페이지는 상담 접수용 페이지입니다. 실제 가능 여부는 입력 정보 확인 후 안내됩니다.<br />
          상호명, 대표자명, 사업자등록번호가 있다면 운영 정보에 추가하는 것을 권장합니다.
        </footer>
      </div>
    </main>
  );
}
