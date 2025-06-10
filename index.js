const DREPORT_SENDERS = [
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

const PROVINCE_MEDICAL_CODE = "509";

class MedicalCode extends HTMLElement {
  static get observedAttributes() {
    return ["sender-code", "year", "so-luu-tru"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const senderCode = this.getAttribute("sender-code") || "";
    const year = this.getAttribute("year") || "";
    const soLuuTru = this.getAttribute("so-luu-tru") || "";
    const sender = DREPORT_SENDERS.find(
      (item) => item.senderCode === senderCode
    );
    if (!sender) return "";

    const medicalCode = `Mã YT: ${PROVINCE_MEDICAL_CODE}/${year}/${soLuuTru}`;
    this.innerHTML = `<div>${medicalCode}</div>`;
  }
}

customElements.define("medical-code", MedicalCode);
