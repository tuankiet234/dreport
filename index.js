const tailwindcssScriptTag = document.createElement("script");
tailwindcssScriptTag.src = `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`;
document.body.appendChild(tailwindcssScriptTag);

const DR_SENDERS = [
  {
    senderCode: "54001",
    senderName: "BỆNH VIỆN ĐA KHOA TỈNH PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "031",
  },
  {
    senderCode: "54010",
    senderName: "BỆNH VIỆN SẢN NHI PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "010",
  },
  {
    senderCode: "54018",
    senderName: "BỆNH VIỆN Y HỌC CỔ TRUYỀN PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "042",
  },
  {
    senderCode: "54008",
    senderName: "BỆNH VIỆN PHỤC HỒI CHỨC NĂNG",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "511",
  },
  {
    senderCode: "54116",
    senderName: "BỆNH VIỆN CÔNG AN PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "116",
  },
  {
    senderCode: "54102",
    senderName: "BỆNH VIỆN DA LIỄU PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "102",
  },
  {
    senderCode: "54162",
    senderName: "PHÒNG KHÁM ĐỨC TÍN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "162",
  },
  {
    senderCode: "54103",
    senderName: "BAN BẢO VỆ CSSK TỈNH PHÚ YÊN",
    parentName: "SỞ Y TẾ PHÚ YÊN",
    hopitalCode: "103",
  },
  {
    senderCode: "54012",
    senderName: "TRUNG TÂM Y TẾ TÂY HÒA",
    parentName: "UBND HUYỆN TÂY HÒA",
    hopitalCode: "012",
  },
  {
    senderCode: "54002",
    senderName: "TRUNG TÂM Y TẾ ĐÔNG HÒA",
    parentName: "UBND HUYỆN ĐÔNG HÒA",
    hopitalCode: "002",
  },
  {
    senderCode: "54028",
    senderName: "TRUNG TÂM Y TẾ PHÚ HÒA",
    parentName: "UBND HUYỆN PHÚ HÒA",
    hopitalCode: "028",
  },
  {
    senderCode: "54004",
    senderName: "TRUNG TÂM Y TẾ SÔNG HINH",
    parentName: "UBND HUYỆN SÔNG HINH",
    hopitalCode: "057",
  },
  {
    senderCode: "54006",
    senderName: "TRUNG TÂM Y TẾ SƠN HÒA",
    parentName: "UBND HUYỆN SƠN HÒA",
    hopitalCode: "054",
  },
  {
    senderCode: "54007",
    senderName: "TRUNG TÂM Y TẾ ĐỒNG XUÂN",
    parentName: "UBND HUYỆN ĐỒNG XUÂN",
    hopitalCode: "007",
  },
  {
    senderCode: "54003",
    senderName: "TRUNG TÂM Y TẾ TUY AN",
    parentName: "UBND HUYỆN TUY AN",
    hopitalCode: "055",
  },
  {
    senderCode: "54016",
    senderName: "TRUNG TÂM Y TẾ THÀNH PHỐ TUY HÒA",
    parentName: "UBND THÀNH PHỐ TUY HÒA",
    hopitalCode: "053",
  },
  {
    senderCode: "54005",
    senderName: "TRUNG TÂM Y TÊ SÔNG CẦU",
    parentName: "UBND THỊ XÃ SÔNG CẦU",
    hopitalCode: "510",
  },
];

const DR_PROVINCE_MEDICAL_CODE = "509";
const drGetSender = (maBenhVien) => {
  return DR_SENDERS.find((item) => item.senderCode === maBenhVien);
};

class DrMedicalCode extends HTMLElement {
  static get observedAttributes() {
    return ["medical-code", "year", "code", "class-name", "label"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const medicalCode = this.getAttribute("medical-code") || "";
    const year = this.getAttribute("year") || "";
    const code = this.getAttribute("code") || "";
    const className = this.getAttribute("class-name") || "";
    const label = this.getAttribute("label") || "";

    this.innerHTML = `<div class="${className}">${
      label === "" ? "Mã YT" : label
    }: ${DR_PROVINCE_MEDICAL_CODE}/${
      drGetSender(medicalCode)?.hopitalCode
    }/${year}/${code}</div>`;
  }
}
class DrParentName extends HTMLElement {
  static get observedAttributes() {
    return ["medical-code", "parent-name", "class-name"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const medicalCode = this.getAttribute("medical-code") || "";
    const className = this.getAttribute("class-name") || "";
    const parentName = this.getAttribute("parent-name") || "";

    if (!!parentName) {
      this.innerHTML = `<div class="font-bold ${className}">${parentName}</div>`;
      return;
    }

    this.innerHTML = `<div class="font-bold ${className}">${
      drGetSender(medicalCode)?.parentName
    }</div>`;
  }
}
class DrSingleCheckBox extends HTMLElement {
  static get observedAttributes() {
    return ["size", "class-name", "value", "label", "label-position"];
  }

  connectedCallback() {
    const options = Object.keys(this.dataset)
      .filter((key) => key.startsWith("label-"))
      .map((key) => ({
        label: this.dataset[key],
        value: this.dataset[key.replace("label-", "value-")],
      }));

    const size = this.getAttribute("size") || "20px";
    const value = this.getAttribute("value") || "";
    const label = this.getAttribute("label") || "";
    const labelPosition = this.getAttribute("label-position") || "left";
    const dataLabelPosition = this.dataset.labelPosition || "left";
    const className = this.getAttribute("class-name") || "";

    this.innerHTML = `<div class="flex justify-between px-1 gap-2 ${className}">
      ${label !== "" && labelPosition === "left" ? `<div>${label}</div>` : ""}
      ${options
        .map(
          (option) => `
      <div class="flex items-center">
                ${
                  dataLabelPosition === "left"
                    ? `<div class="mr-1">${option.label}</div>`
                    : ""
                }
                <div class="border border-solid border-black size-[${size}] flex justify-center items-center">
                    ${option.value === value ? "X" : ""}
                </div>
                ${
                  dataLabelPosition === "right"
                    ? `<div class="ml-1">${option.label}</div>`
                    : ""
                }
            </div>
    `
        )
        .join("\n")}
      ${label !== "" && labelPosition === "right" ? `<div>${label}</div>` : ""}
    </div>`;
  }
}
class DrItemCodeBoxes extends HTMLElement {
  static get observedAttributes() {
    return ["size", "class-name", "label", "code"];
  }

  connectedCallback() {
    const size = this.getAttribute("size") || "20px";
    const value = this.getAttribute("value") || "";
    const label = this.getAttribute("label") || "";
    const code = this.getAttribute("code") || "";
    const className = this.getAttribute("class-name") || "";

    this.innerHTML = `
      <div class="flex justify-between items-center px-1 ${className}">
        <div>${label}: ${value}</div>
        <div class="flex justify-end gap-1">
          ${Array.from(code.toString())
            .map(
              (value) => `
                  <div class="flex justify-center items-center border border-black size-[${size}]">
                      ${value.trim()}
                  </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}
class DrHealthTable extends HTMLElement {
  static get observedAttributes() {
    return ["class-name"];
  }
  connectedCallback() {
    const className = this.getAttribute("class-name") || "";
    // Calculate BMI if values are valid
    let bmi = "";
    try {
      // Parse weight (cannang) and height (chieucao) from dataset
      const cannang = parseFloat(this.dataset.cannang);
      const chieucao = parseFloat(this.dataset.chieucao);
      if (!isNaN(cannang) && !isNaN(chieucao) && chieucao > 0) {
        bmi = (cannang / (chieucao / 100) ** 2).toFixed(1);
      }
    } catch {
      // If there's an error in parsing or calculation, bmi will remain an empty string
      bmi = "";
    }

    this.innerHTML = `
    <div class="px-1 ${className}">
      <table class="border w-[300px] italic">
        <tr class="border">
          <td class="p-1">Mạch</td>
          <td>${this.dataset.mach ?? ""}</td>
          <td class="text-right p-1">lần/ph</td>
        </tr>
        <tr class="border">
          <td class="p-1">Nhiệt độ</td>
          <td>${this.dataset.nhietdo ?? ""}</td>
          <td class="text-right p-1">℃</td>
        </tr>
        <tr class="border">
          <td class="p-1">Huyết áp</td>
          <td>${this.dataset.huyetap ?? ""}</td>
          <td class="text-right p-1">mmHg</td>
        </tr>
        <tr class="border">
          <td class="p-1">Nhịp thở</td>
          <td>${this.dataset.nhiptho ?? ""}</td>
          <td class="text-right p-1">lần/ph</td>
        </tr>
        <tr class="border">
          <td class="p-1">Cân nặng</td>
          <td>${this.dataset.cannang ?? ""}</td>
          <td class="text-right p-1">kg</td>
        </tr>
        <tr class="border">
          <td class="p-1">Chiều cao</td>
          <td>${this.dataset.chieucao ?? ""}</td>
          <td class="text-right p-1">cm</td>
        </tr>
        <tr class="border">
          <td class="p-1">BMI</td>
          <td>${bmi}</td>
          <td class="text-right p-1"></td>
        </tr>
      </table>
    </div>
    `;
  }
}
class DrSignature extends HTMLElement {
  static get observedAttributes() {
    return [
      "class-name",
      "signed-order",
      "width",
      "height",
      "sign-image",
      "sign-info",
      "position",
    ];
  }

  connectedCallback() {
    const className = this.getAttribute("class-name") || "";
    const position = this.getAttribute("position") || "";
    const width = this.getAttribute("width") || "150";
    const height = this.getAttribute("height") || "80";
    const signImage = this.getAttribute("sign-image") || "";
    const signInfo = this.getAttribute("sign-info") || "";

    let signHtml = "";
    if (signImage !== "") {
      signHtml = `<img src="data:image/png;base64,${signImage}" width="${width}" height="${height}">`;
    }
    let signerName = "";
    if (signInfo !== "") {
      const signInfoObj = Object.fromEntries(
        signInfo.split(",").map((item) => item.split("="))
      );
      signerName = signInfoObj.CN;
    }

    this.innerHTML = `
      <div class="flex flex-col justify-between items-center px-1 ${className}"> 
        <div class="font-bold">${position}</div>
        <div>${signHtml}</div>
        <div>${signerName}</div>
      </div>
    `;
  }
}

customElements.define("dr-single-check-box", DrSingleCheckBox);
customElements.define("dr-item-code-boxes", DrItemCodeBoxes);
customElements.define("dr-medical-code", DrMedicalCode);
customElements.define("dr-parent-name", DrParentName);
customElements.define("dr-health-table", DrHealthTable);
customElements.define("dr-signature", DrSignature);
