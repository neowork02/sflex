import _ from 'lodash'
import PosPrint from '~common/js/PosPrint/pos-print.js';
const LF = '\n'
const giftAmtMap = {
  giftDeposit1kCnt: 1000,   
  giftDeposit2kCnt: 2000,  
  giftDeposit5kCnt: 5000,  
  giftDeposit10kCnt: 10000,  
  giftDeposit30kCnt: 30000,
  giftDeposit50kCnt: 50000,
  giftDeposit70kCnt: 70000,
  giftDeposit100kCnt: 100000,
  giftDeposit300kCnt: 300000,
  giftDeposit500kCnt: 500000
}
export default {
  data () {
    return {
      srchObj: {
        saleDate: '',
        posId: ''
      },
      userInfo: {},
      posInfo: {
        parkFgNm: '',
        posId: '',
        posNm: '',
        posKindName: '',
        eodFgName: '',
        sodFgName: ''
      },
      calculateInfo: {},
      penaltyInfo: {},
      depositInfo: {},
      payInfo: {},
      giftList: [],
      orgGiftList: [],
      amtInfo: {},
      cardList: [],
      empCreditInfo: {},
      esignInfo: {},
      saleCreditList: [],
      ticketList: []
    }
  },
  watch: {
    calculateInfo: {
      deep: true,
      handler(newObj, oldObj) {
        this.calculateInfo.iwolCashCntAmt = this.calculateInfoSummary.sumIwolAmt
        this.calculateInfo.demandCashCntAmt = this.calculateInfoSummary.demandCashAmt
        this.calculateInfo.prepareTotAmt = this.calculateInfoSummary.saveCashAmt
      }
    },
    depositInfo: {
      deep: true,
      handler(newObj, oldObj) {
        this.payInfo.depCashCnt = this.depositInfoSummary.cashSummary.cnt + this.depositInfoSummary.checkDepositSummary.cnt
        this.payInfo.depCashAmt = this.depositInfoSummary.cashSummary.amt + this.depositInfoSummary.checkDepositSummary.amt
        this.payInfo.depTicketCnt = Number(newObj.ticketDepositCnt)
        this.payInfo.depTicketAmt = Number(newObj.ticketDepositAmt)
        this.payInfo.depGiftcardCnt = Number(newObj.giftDepositCnt)
        this.payInfo.depGiftcardAmt = Number(newObj.giftDepositAmt)

        this.depositInfo.checkDepositTotAmt = this.depositInfoSummary.cashSummary.amt
        this.depositInfo.cashDepositTotAmt = this.depositInfoSummary.checkDepositSummary.amt
      }
    },
  },
  computed: {
    params() {
      return {
        posId: this.srchObj.posId,
        saleDate: this.srchObj.saleDate.replace(/-/g,'')
      }
    },
    calculateInfoSummary() {
      const cal = this.calculateInfo
      return {
        sumPrepareInitCnt: 
          cal.prepareInit50kCnt + cal.prepareInit10kCnt + cal.prepareInit5kCnt + cal.prepareInit1kCnt
           + cal.prepareInit500Cnt + cal.prepareInit100Cnt + cal.prepareInit10Cnt + cal.prepareInit50kCnt,
        sumPrepareInitAmt:
          cal.prepareInit50kAmt + cal.prepareInit10kAmt + cal.prepareInit5kAmt + cal.prepareInit1kAmt
           + cal.prepareInit500Amt + cal.prepareInit100Amt + cal.prepareInit10Amt + cal.prepareInit50Amt,
        sumPrepareInitAddCnt:
          cal.prepareInitAdd50kCnt + cal.prepareInitAdd10kCnt + cal.prepareInitAdd5kCnt + cal.prepareInitAdd1kCnt
           + cal.prepareInitAdd500Cnt + cal.prepareInitAdd100Cnt + cal.prepareInitAdd10Cnt + cal.prepareInitAdd50Cnt,
        sumPrepareInitAddAmt:
          cal.prepareInitAdd50kAmt + cal.prepareInitAdd10kAmt + cal.prepareInitAdd5kAmt + cal.prepareInitAdd1kAmt
           + cal.prepareInitAdd500Amt + cal.prepareInitAdd100Amt + cal.prepareInitAdd10Amt + cal.prepareInitAdd50Amt,
        sumPrepareInitTotCnt:
          cal.prepareInit50kCnt + cal.prepareInit10kCnt + cal.prepareInit5kCnt + cal.prepareInit1kCnt
           + cal.prepareInit500Cnt + cal.prepareInit100Cnt + cal.prepareInit10Cnt + cal.prepareInit50Cnt
           + cal.prepareInitAdd50kCnt + cal.prepareInitAdd10kCnt + cal.prepareInitAdd5kCnt + cal.prepareInitAdd1kCnt
           + cal.prepareInitAdd500Cnt + cal.prepareInitAdd100Cnt + cal.prepareInitAdd10Cnt + cal.prepareInitAdd50Cnt,
        sumPrepareInitTotAmt:
          cal.prepareInit50kAmt + cal.prepareInit10kAmt + cal.prepareInit5kAmt + cal.prepareInit1kAmt
           + cal.prepareInit500Amt + cal.prepareInit100Amt + cal.prepareInit10Amt + cal.prepareInit50Amt
           + cal.prepareInitAdd50kAmt + cal.prepareInitAdd10kAmt + cal.prepareInitAdd5kAmt + cal.prepareInitAdd1kAmt
           + cal.prepareInitAdd500Amt + cal.prepareInitAdd100Amt + cal.prepareInitAdd10Amt + cal.prepareInitAdd50Amt,
        sumIwolCnt:
           Number(cal.iwolCashCnt50kCnt) + Number(cal.iwolCashCnt10kCnt) + Number(cal.iwolCashCnt5kCnt) + Number(cal.iwolCashCnt1kCnt)
           + Number(cal.iwolCashCnt500Cnt) + Number(cal.iwolCashCnt100Cnt) + Number(cal.iwolCashCnt50Cnt) + Number(cal.iwolCashCnt10Cnt),
        sumIwolAmt:
          (cal.iwolCashCnt50kCnt * 50000) + (cal.iwolCashCnt10kCnt * 10000) + (cal.iwolCashCnt5kCnt * 5000) + (cal.iwolCashCnt1kCnt * 1000)
           + (cal.iwolCashCnt500Cnt * 500) + (cal.iwolCashCnt100Cnt * 100) + (cal.iwolCashCnt50Cnt * 50) + (cal.iwolCashCnt10Cnt * 10),
        demandCashCnt:
          Number(cal.demandCashCnt50kCnt) + Number(cal.demandCashCnt10kCnt) + Number(cal.demandCashCnt5kCnt) + Number(cal.demandCashCnt1kCnt)
           + Number(cal.demandCashCnt500Cnt) + Number(cal.demandCashCnt100Cnt) + Number(cal.demandCashCnt50Cnt) + Number(cal.demandCashCnt10Cnt),
        demandCashAmt:
          (cal.demandCashCnt50kCnt * 50000) + (cal.demandCashCnt10kCnt * 10000) + (cal.demandCashCnt5kCnt * 5000) + (cal.demandCashCnt1kCnt * 1000)
           + (cal.demandCashCnt500Cnt * 500) + (cal.demandCashCnt100Cnt * 100) + (cal.demandCashCnt50Cnt * 50) + (cal.demandCashCnt10Cnt * 10),
        saveCashCnt:
          Number(cal.iwolCashCnt50kCnt) + Number(cal.iwolCashCnt10kCnt) + Number(cal.iwolCashCnt5kCnt) + Number(cal.iwolCashCnt1kCnt)
           + Number(cal.iwolCashCnt500Cnt) + Number(cal.iwolCashCnt100Cnt) + Number(cal.iwolCashCnt50Cnt) + Number(cal.iwolCashCnt10Cnt)
           + Number(cal.demandCashCnt50kCnt) + Number(cal.demandCashCnt10kCnt) + Number(cal.demandCashCnt5kCnt) + Number(cal.demandCashCnt1kCnt)
           + Number(cal.demandCashCnt500Cnt) + Number(cal.demandCashCnt100Cnt) + Number(cal.demandCashCnt50Cnt) + Number(cal.demandCashCnt10Cnt),
        saveCashAmt:
          (cal.iwolCashCnt50kCnt * 50000) + (cal.iwolCashCnt10kCnt * 10000) + (cal.iwolCashCnt5kCnt * 5000) + (cal.iwolCashCnt1kCnt * 1000)
           + (cal.iwolCashCnt500Cnt * 500) + (cal.iwolCashCnt100Cnt * 100) + (cal.iwolCashCnt50Cnt * 50) + (cal.iwolCashCnt10Cnt * 10)
           + (cal.demandCashCnt50kCnt * 50000) + (cal.demandCashCnt10kCnt * 10000) + (cal.demandCashCnt5kCnt * 5000) + (cal.demandCashCnt1kCnt * 1000)
           + (cal.demandCashCnt500Cnt * 500) + (cal.demandCashCnt100Cnt * 100) + (cal.demandCashCnt50Cnt * 50) + (cal.demandCashCnt10Cnt * 10),
      }
    },
    depositInfoSummary() {
      const dep = this.depositInfo
      return {
        cashSummary: {
          cnt: 
            Number(dep.cashDeposit50kCnt) + Number(dep.cashDeposit10kCnt) + Number(dep.cashDeposit5kCnt) + Number(dep.cashDeposit1kCnt)
            + Number(dep.cashDeposit500Cnt) + Number(dep.cashDeposit100Cnt) + Number(dep.cashDeposit50Cnt) + Number(dep.cashDeposit10Cnt),
          amt:
            (dep.cashDeposit50kCnt * 50000) + (dep.cashDeposit10kCnt * 10000) + (dep.cashDeposit5kCnt * 5000) + (dep.cashDeposit1kCnt * 1000)
            + (dep.cashDeposit500Cnt * 500) + (dep.cashDeposit100Cnt * 100) + (dep.cashDeposit50Cnt * 50) + (dep.cashDeposit10Cnt * 10),
        },
        checkDepositSummary: {
          cnt: 
            Number(dep.checkDeposit1000kCnt) + Number(dep.checkDeposit500kCnt) + Number(dep.checkDeposit300kCnt)
             + Number(dep.checkDeposit100kCnt) + Number(dep.checkDepositEtcCnt),
          amt:
            (dep.checkDeposit1000kCnt * 1000000) + (dep.checkDeposit500kCnt * 500000) + (dep.checkDeposit300kCnt * 300000)
            + (dep.checkDeposit100kCnt * 100000) + Number(dep.checkDepositEtcAmt),
        },
        totalSummary: {
          cnt: 
            Number(dep.cashDeposit50kCnt) + Number(dep.cashDeposit10kCnt) + Number(dep.cashDeposit5kCnt) + Number(dep.cashDeposit1kCnt)
            + Number(dep.cashDeposit500Cnt) + Number(dep.cashDeposit100Cnt) + Number(dep.cashDeposit50Cnt) + Number(dep.cashDeposit10Cnt)
            + Number(dep.checkDeposit1000kCnt) + Number(dep.checkDeposit500kCnt) + Number(dep.checkDeposit300kCnt) 
            + Number(dep.checkDeposit100kCnt) + Number(dep.checkDepositEtcCnt) + Number(dep.giftDepositCnt) + Number(dep.ticketDepositCnt),
          amt:
            (dep.cashDeposit50kCnt * 50000) + (dep.cashDeposit10kCnt * 10000) + (dep.cashDeposit5kCnt * 5000) + (dep.cashDeposit1kCnt * 1000)
            + (dep.cashDeposit500Cnt * 500) + (dep.cashDeposit100Cnt * 100) + (dep.cashDeposit50Cnt * 50) + (dep.cashDeposit10Cnt * 10)
            + (dep.checkDeposit1000kCnt * 1000000) + (dep.checkDeposit500kCnt * 500000) + (dep.checkDeposit300kCnt * 300000)
            + (dep.checkDeposit100kCnt * 100000) + Number(dep.checkDepositEtcAmt) + dep.giftDepositAmt + Number(dep.ticketDepositAmt)
        }
      }
    },
    payInfoSummary() {
      const pay = this.payInfo
      return {
        cashInfo: {
          depCnt: pay.depCashCnt + pay.depGiftcardCnt + pay.depTicketCnt,
          depAmt: pay.depCashAmt + pay.depGiftcardAmt + pay.depTicketAmt,
          svrCnt: pay.svrCashCnt + pay.svrGiftcardCnt + pay.svrTicketCnt,
          svrAmt: pay.svrCashAmt + pay.svrGiftcardAmt + pay.svrTicketAmt,
          posCnt: pay.posCashCnt + pay.posGiftcardCnt + pay.posTicketCnt,
          posAmt: pay.posCashAmt + pay.posGiftcardAmt + pay.posTicketAmt,
          svrSubstractionPos: (pay.svrCashAmt + pay.svrGiftcardAmt + pay.svrTicketAmt) - (pay.posCashAmt + pay.posGiftcardAmt + pay.posTicketAmt)
        },
        totalInfo: {
          depCnt: pay.depCashCnt + pay.depGiftcardCnt + pay.depGiftCnt + pay.depTicketCnt 
            + pay.depCardCnt + pay.depCreditCnt + pay.depWebCnt + pay.depDreampointCnt,
          depAmt: pay.depCashAmt + pay.depGiftcardAmt + pay.depGiftAmt + pay.depTicketAmt 
            + pay.depCardAmt + pay.depCreditAmt + pay.depWebAmt + pay.depDreampointAmt,
          svrCnt: pay.svrCashCnt + pay.svrGiftcardCnt + pay.svrGiftCnt + pay.svrTicketCnt 
            + pay.svrCardCnt + pay.svrCreditCnt + pay.svrWebCnt + pay.svrDreampointCnt,
          svrAmt: pay.svrCashAmt + pay.svrGiftcardAmt + pay.svrGiftAmt + pay.svrTicketAmt 
            + pay.svrCardAmt + pay.svrCreditAmt + pay.svrWebAmt + pay.svrDreampointAmt,
          posCnt: pay.posCashCnt + pay.posGiftcardCnt + pay.posGiftCnt + pay.posTicketCnt
            + pay.posCardCnt + pay.posCreditCnt + pay.posWebCnt + pay.posDreampointCnt,
          posAmt: pay.posCashAmt + pay.posGiftcardAmt + pay.posGiftAmt + pay.posTicketAmt 
            + pay.posCardAmt + pay.posCreditAmt + pay.posWebAmt + pay.posDreampointAmt,
          svrSubstractionPos: 
            (pay.svrCashAmt + pay.svrGiftcardAmt + pay.svrGiftAmt + pay.svrTicketAmt 
            + pay.svrCardAmt + pay.svrCreditAmt + pay.svrWebAmt + pay.svrDreampointAmt) 
            - (pay.posCashAmt + pay.posGiftcardAmt + pay.posGiftAmt + pay.posTicketAmt 
            + pay.posCardAmt + pay.posCreditAmt + pay.posWebAmt + pay.posDreampointAmt)
        }
      }
    },
    giftRowSummary() {
      return this.giftList.map(v => {
        return {
          cnt: Number(v.giftDeposit1kCnt) + Number(v.giftDeposit2kCnt) + Number(v.giftDeposit5kCnt) + Number(v.giftDeposit10kCnt)
            + Number(v.giftDeposit30kCnt) + Number(v.giftDeposit50kCnt) + Number(v.giftDeposit70kCnt) + Number(v.giftDeposit100kCnt)
            + Number(v.giftDeposit300kCnt) + Number(v.giftDeposit500kCnt),
          amt: (v.giftDeposit1kCnt * 1000) + (v.giftDeposit2kCnt * 2000) + (v.giftDeposit5kCnt * 5000) + (v.giftDeposit10kCnt * 10000)
            + (v.giftDeposit30kCnt * 30000) + (v.giftDeposit50kCnt * 50000) + (v.giftDeposit70kCnt * 70000)+ (v.giftDeposit100kCnt * 100000)
            + (v.giftDeposit300kCnt * 300000) + (v.giftDeposit500kCnt * 500000)
        }
      })
    },
    giftColSummary() {
      let result = this.giftList.reduce((acc, v) => {
        acc.cnt.g1k += Number(v.giftDeposit1kCnt)
        acc.cnt.g2k += Number(v.giftDeposit2kCnt)
        acc.cnt.g5k += Number(v.giftDeposit5kCnt)
        acc.cnt.g10k += Number(v.giftDeposit10kCnt)
        acc.cnt.g30k += Number(v.giftDeposit30kCnt)
        acc.cnt.g50k += Number(v.giftDeposit50kCnt)
        acc.cnt.g70k += Number(v.giftDeposit70kCnt)
        acc.cnt.g100k += Number(v.giftDeposit100kCnt)
        acc.cnt.g300k += Number(v.giftDeposit300kCnt)
        acc.cnt.g500k += Number(v.giftDeposit500kCnt)
        acc.amt.g1k += (v.giftDeposit1kCnt * 1000)
        acc.amt.g2k += (v.giftDeposit2kCnt * 2000)
        acc.amt.g5k += (v.giftDeposit5kCnt * 5000)
        acc.amt.g10k += (v.giftDeposit10kCnt * 10000)
        acc.amt.g30k += (v.giftDeposit30kCnt * 30000)
        acc.amt.g50k += (v.giftDeposit50kCnt * 50000)
        acc.amt.g70k += (v.giftDeposit70kCnt * 70000)
        acc.amt.g100k += (v.giftDeposit100kCnt * 100000)
        acc.amt.g300k += (v.giftDeposit300kCnt * 300000)
        acc.amt.g500k += (v.giftDeposit500kCnt * 500000)
        return acc
      }, {
        cnt: { g1k:0, g2k:0, g5k:0, g10k:0, g30k:0, g50k:0, g70k:0, g100k:0, g300k:0, g500k:0, total: 0 },
        amt: { g1k:0, g2k:0, g5k:0, g10k:0, g30k:0, g50k:0, g70k:0, g100k:0, g300k:0, g500k:0, total: 0 }
      })

      result.cnt.total = result.cnt.g1k + result.cnt.g2k + result.cnt.g5k + result.cnt.g10k + result.cnt.g30k
         + result.cnt.g50k + result.cnt.g70k + result.cnt.g100k + result.cnt.g300k + result.cnt.g500k 
      result.amt.total = result.amt.g1k + result.amt.g2k + result.amt.g5k + result.amt.g10k + result.amt.g30k
         + result.amt.g50k + result.amt.g70k + result.amt.g100k + result.amt.g300k + result.amt.g500k

      this.depositInfo.giftDepositCnt = result.cnt.total
      this.depositInfo.giftDepositAmt = result.amt.total

      return result
    }
  },
  methods: {
    dumpCalculInfo() {
      return {
        saleDate: this.params.saleDate,
        posId: this.params.posId,
        prepareInitTotAmt: 0,
        prepareInitAddTotAmt: 0,
        keepCashCntAmt: 0,
        iwolCashCntAmt: 0,
        demandCashCntFg: 0,
        demandCashCntAmt: 0,
        prepareInit50kAmt: 0,
        prepareInit10kAmt: 0,
        prepareInit5kAmt: 0,
        prepareInit1kAmt: 0,
        prepareInit500Amt: 0,
        prepareInit100Amt: 0,
        prepareInit50Amt: 0,
        prepareInit10Amt: 0,
        prepareInit50kCnt: 0,
        prepareInit10kCnt: 0,
        prepareInit5kCnt: 0,
        prepareInit1kCnt: 0,
        prepareInit500Cnt: 0,
        prepareInit100Cnt: 0,
        prepareInit50Cnt: 0,
        prepareInit10Cnt: 0,
        prepareInitAdd50kAmt: 0,
        prepareInitAdd10kAmt: 0,
        prepareInitAdd5kAmt: 0,
        prepareInitAdd1kAmt: 0,
        prepareInitAdd500Amt: 0,
        prepareInitAdd100Amt: 0,
        prepareInitAdd50Amt: 0,
        prepareInitAdd10Amt: 0,
        prepareInitAdd50kCnt: 0,
        prepareInitAdd10kCnt: 0,
        prepareInitAdd5kCnt: 0,
        prepareInitAdd1kCnt: 0,
        prepareInitAdd500Cnt: 0,
        prepareInitAdd100Cnt: 0,
        prepareInitAdd50Cnt: 0,
        prepareInitAdd10Cnt: 0,
        iwolCashCnt50kCnt: 0,
        iwolCashCnt10kCnt: 0,
        iwolCashCnt5kCnt: 0,
        iwolCashCnt1kCnt: 0,
        iwolCashCnt500Cnt: 0,
        iwolCashCnt100Cnt: 0,
        iwolCashCnt50Cnt: 0,
        iwolCashCnt10Cnt: 0,
        demandCashCnt50kCnt: 0,
        demandCashCnt10kCnt: 0,
        demandCashCnt5kCnt: 0,
        demandCashCnt1kCnt: 0,
        demandCashCnt500Cnt: 0,
        demandCashCnt100Cnt: 0,
        demandCashCnt50Cnt: 0,
        demandCashCnt10Cnt: 0
      }
    },
    dumpPenaltyInfo() {
      return {
        depositCnt: 0,
        depositAmt: 0,
        penaltyCnt: 0,
        penaltyAmt: 0
      }
    },
    dumpDepositInfo() {
      return {
        saleDate: this.params.saleDate,
        posId: this.params.posId,
        cashDepositTotAmt: 0,
        cashDeposit50kCnt: 0,
        cashDeposit10kCnt: 0,
        cashDeposit5kCnt: 0,
        cashDeposit1kCnt: 0,
        cashDeposit500Cnt: 0,
        cashDeposit100Cnt: 0,
        cashDeposit50Cnt: 0,
        cashDeposit10Cnt: 0,
        checkDepositTotAmt: 0,
        checkDeposit1000kCnt: 0,
        checkDeposit500kCnt: 0,
        checkDeposit300kCnt: 0,
        checkDeposit100kCnt: 0,
        checkDepositEtcCnt: 0,
        checkDepositEtcAmt: 0,
        depositCheckYn: 'N',
        depositDt: '',
        depositTm: '',
        giftDepositCnt: 0,
        giftDepositAmt: 0,
        ticketDepositCnt: 0,
        ticketDepositAmt: 0,
        midDepositTotAmt: 0
      }
    },
    dumpPayInfo() {
      return {
        saleDate: this.params.saleDate,
        posId: this.params.posId,
        depCashCnt: 0,
        depCashAmt: 0,
        svrCashCnt: 0,
        svrCashAmt: 0,
        posCashCnt: 0,
        posCashAmt: 0,
        depGiftcardCnt: 0,
        depGiftcardAmt: 0,
        svrGiftcardCnt: 0,
        svrGiftcardAmt: 0,
        posGiftcardCnt: 0,
        posGiftcardAmt: 0,
        depGiftCnt: 0,
        depGiftAmt: 0,
        svrGiftCnt: 0,
        svrGiftAmt: 0,
        posGiftCnt: 0,
        posGiftAmt: 0,
        depTicketCnt: 0,
        depTicketAmt: 0,
        svrTicketCnt: 0,
        svrTicketAmt: 0,
        posTicketCnt: 0,
        posTicketAmt: 0,
        depCardCnt: 0,
        depCardAmt: 0,
        svrCardCnt: 0,
        svrCardAmt: 0,
        posCardCnt: 0,
        posCardAmt: 0,
        depCreditCnt: 0,
        depCreditAmt: 0,
        svrCreditCnt: 0,
        svrCreditAmt: 0,
        posCreditCnt: 0,
        posCreditAmt: 0,
        depWebCnt: 0,
        depWebAmt: 0,
        svrWebCnt: 0,
        svrWebAmt: 0,
        posWebCnt: 0,
        posWebAmt: 0,
        depDreampointCnt: 0,
        depDreampointAmt: 0,
        svrDreampointCnt: 0,
        svrDreampointAmt: 0,
        posDreampointCnt: 0,
        posDreampointAmt: 0
      }
    },
    saveGiftList() {
      let results = []
      this.giftList.forEach(v => {
        for (const k in v) {
          if(giftAmtMap[k]) {
            results.push({
              saleDate: this.params.saleDate,
              posId : this.params.posId,
              cmpnyCd: v.cmpnyCd,
              giftAmt: giftAmtMap[k],
              giftDepositCnt: v[k],
              giftDepositAmt: v[k] * giftAmtMap[k] 
            })
          }
        }
      })
      return results
    },
    numberWithCommas(number) {
      return (number||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    keyDown(objId, id) {
      objId[id] = objId[id].replace(/[^0-9]/g, '');
      if(objId[id].length > 1) {
        while(objId[id][0] == 0 && objId[id].length > 1) 
          objId[id] = objId[id].replace('0', '')
      } else if(objId[id].length === 0) {
        objId[id] = 0
      }
    },
    noneInputeTextField(disabled) {
      const fields = document.getElementsByClassName('input-text-sap00001')
      for (let idx = 0; idx < fields.length; idx++) fields[idx].disabled = disabled
    },



    /* ============================ print 출력용 ========================================== */
    // 포스정보 출력
    posInfoPrint(bxlPosUtils) {
      const dateArr = this.srchObj.saleDate.split('-')
      let prtData = `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일 ${this.amtInfo.nowDate.substr(8, 2)}시 ${this.amtInfo.nowDate.substr(10, 2)}분${LF}`
      prtData += `POS 번호 : ${this.posInfo.posId}${LF}` 
      prtData += `매    장 : ${this.posInfo.posNm}${LF}${LF}`
      prtData += `입 금 원 : ${this.userInfo.userName}${LF}${LF}`
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
    },

    // 시재확인표
    printSije(bxlPosUtils) {
      const posPrint = new PosPrint()
      const iwolCash50KAmt = this.numberWithCommas(this.calculateInfo.iwolCashCnt50kCnt * 50000,)
      const iwolCash10KAmt = this.numberWithCommas(this.calculateInfo.iwolCashCnt10kCnt * 10000)
      const iwolCash5KAmt  = this.numberWithCommas(this.calculateInfo.iwolCashCnt5kCnt * 5000)
      const iwolCash1KAmt  = this.numberWithCommas(this.calculateInfo.iwolCashCnt1kCnt * 1000)
      const iwolCash500Amt   = this.numberWithCommas(this.calculateInfo.iwolCashCnt500Cnt * 500)
      const iwolCash100Amt   = this.numberWithCommas(this.calculateInfo.iwolCashCnt100Cnt* 100)
      const iwolCash50Amt    = this.numberWithCommas(this.calculateInfo.iwolCashCnt50Cnt * 50)
      const iwolCash10Amt    = this.numberWithCommas(this.calculateInfo.iwolCashCnt10Cnt * 10)
  
      const demandCash50KAmt = this.numberWithCommas(this.calculateInfo.demandCashCnt50kCnt * 50000)
      const demandCash10KAmt = this.numberWithCommas(this.calculateInfo.demandCashCnt10kCnt * 10000)
      const demandCash5KAmt  = this.numberWithCommas(this.calculateInfo.demandCashCnt5kCnt * 5000)
      const demandCash1KAmt  = this.numberWithCommas(this.calculateInfo.demandCashCnt1kCnt* 1000)
      const demandCash500Amt   = this.numberWithCommas(this.calculateInfo.demandCashCnt500Cnt * 500)
      const demandCash100Amt   = this.numberWithCommas(this.calculateInfo.demandCashCnt100Cnt * 100)
      const demandCash50Amt    = this.numberWithCommas(this.calculateInfo.demandCashCnt50Cnt * 50)
      const demandCash10Amt    = this.numberWithCommas(this.calculateInfo.demandCashCnt10Cnt * 10)

      const iwolCashTotAmt = this.numberWithCommas(this.calculateInfoSummary.sumIwolAmt)
      const demandCashTotAmt = this.numberWithCommas(this.calculateInfoSummary.demandCashAmt)

      posPrint.printStamp(bxlPosUtils)
      this.posInfoPrint(bxlPosUtils, 0, 0, false, false, false, 0, 0) // 포스정보 출력
    
      let prtData = '시재확인표' + LF
      prtData += '[매장보관용]' + LF
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 1)
      posPrint.printLine(bxlPosUtils)					

      prtData = "권  종" + utils.space(24 - utils.lengthb("권  종") - utils.lengthb("이월시재")) + "이월시재" + utils.space(18 - utils.lengthb("청구시재")) + "청구시재" + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0) ;					
      posPrint.printLine(bxlPosUtils)		
      
      prtData  = "50,000" + utils.space(24 - utils.lengthb("50,000") - utils.lengthb(iwolCash50KAmt)) + iwolCash50KAmt + utils.space(18 - utils.lengthb(demandCash50KAmt)) + demandCash50KAmt + LF;
      prtData += "10,000" + utils.space(24 - utils.lengthb("10,000") - utils.lengthb(iwolCash10KAmt)) + iwolCash10KAmt + utils.space(18 - utils.lengthb(demandCash10KAmt)) + demandCash10KAmt + LF;
      prtData += " 5,000" + utils.space(24 - utils.lengthb(" 5,000") - utils.lengthb(iwolCash5KAmt )) + iwolCash5KAmt  + utils.space(18 - utils.lengthb(demandCash5KAmt )) + demandCash5KAmt  + LF;
      prtData += " 1,000" + utils.space(24 - utils.lengthb(" 1,000") - utils.lengthb(iwolCash1KAmt )) + iwolCash1KAmt  + utils.space(18 - utils.lengthb(demandCash1KAmt )) + demandCash1KAmt  + LF;
      prtData += "   500" + utils.space(24 - utils.lengthb("   500") - utils.lengthb(iwolCash500Amt  )) + iwolCash500Amt   + utils.space(18 - utils.lengthb(demandCash500Amt  )) + demandCash500Amt   + LF;
      prtData += "   100" + utils.space(24 - utils.lengthb("   100") - utils.lengthb(iwolCash100Amt  )) + iwolCash100Amt   + utils.space(18 - utils.lengthb(demandCash100Amt  )) + demandCash100Amt   + LF;
      prtData += "    50" + utils.space(24 - utils.lengthb("    50") - utils.lengthb(iwolCash50Amt   )) + iwolCash50Amt    + utils.space(18 - utils.lengthb(demandCash50Amt   )) + demandCash50Amt    + LF;
      prtData += "    10" + utils.space(24 - utils.lengthb("    10") - utils.lengthb(iwolCash10Amt   )) + iwolCash10Amt    + utils.space(18 - utils.lengthb(demandCash10Amt   )) + demandCash10Amt    + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)					
      posPrint.printLine(bxlPosUtils)		
      
      prtData = "합  계" + utils.space(24 - utils.lengthb("합  계") - utils.lengthb(iwolCashTotAmt)) + iwolCashTotAmt + utils.space(18 - utils.lengthb(demandCashTotAmt)) + demandCashTotAmt + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)			
      posPrint.printLine(bxlPosUtils)		
      
      const total = this.numberWithCommas(this.calculateInfoSummary.sumPrepareInitTotAmt)
      prtData = "준비시재총액 : " + utils.space(42 - utils.lengthb("준비시재총액 : ") - utils.lengthb(total)) + total + LF
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
    },

    // 권종별청구액
    printItem(bxlPosUtils) {
      const posPrint = new PosPrint()
      const demandCash50KCnt = this.numberWithCommas(this.calculateInfo.demandCashCnt50kCnt)
      const demandCash10KCnt = this.numberWithCommas(this.calculateInfo.demandCashCnt10kCnt)
      const demandCash5KCnt  = this.numberWithCommas(this.calculateInfo.demandCashCnt5kCnt)
      const demandCash1KCnt  = this.numberWithCommas(this.calculateInfo.demandCashCnt1kCnt)
      const demandCash500Cnt   = this.numberWithCommas(this.calculateInfo.demandCashCnt500Cnt)
      const demandCash100Cnt   = this.numberWithCommas(this.calculateInfo.demandCashCnt100Cnt)
      const demandCash50Cnt    = this.numberWithCommas(this.calculateInfo.demandCashCnt50Cnt)
      const demandCash10Cnt    = this.numberWithCommas(this.calculateInfo.demandCashCnt10Cnt)

      const demandCash50KAmt = this.numberWithCommas(this.calculateInfo.demandCashCnt50kCnt * 50000)
      const demandCash10KAmt = this.numberWithCommas(this.calculateInfo.demandCashCnt10kCnt * 10000)
      const demandCash5KAmt  = this.numberWithCommas(this.calculateInfo.demandCashCnt5kCnt * 5000)
      const demandCash1KAmt  = this.numberWithCommas(this.calculateInfo.demandCashCnt1kCnt * 1000)
      const demandCash500Amt   = this.numberWithCommas(this.calculateInfo.demandCashCnt500Cnt * 500)
      const demandCash100Amt   = this.numberWithCommas(this.calculateInfo.demandCashCnt100Cnt * 100)
      const demandCash50Amt    = this.numberWithCommas(this.calculateInfo.demandCashCnt50Cnt * 50)
      const demandCash10Amt    = this.numberWithCommas(this.calculateInfo.demandCashCnt10Cnt * 10)

      const demandCashTotAmt = this.numberWithCommas(this.calculateInfoSummary.demandCashAmt)

      posPrint.printStamp(bxlPosUtils)
      this.posInfoPrint(bxlPosUtils) // 포스정보 출력

      let prtData = '익일 권종별 청구액' + LF
      prtData += '[매장보관용]' + LF
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 1)
      posPrint.printLine(bxlPosUtils)				
                      
      prtData = "권  종" + utils.space(24 - utils.lengthb("권  종") - utils.lengthb("수  량")) + "수  량" + utils.space(18 - utils.lengthb("금  액")) + "금  액" + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)	
      
      prtData  = "50,000" + utils.space(24 - utils.lengthb("50,000") - utils.lengthb(demandCash50KCnt)) + demandCash50KCnt + utils.space(18 - utils.lengthb(demandCash50KAmt)) + demandCash50KAmt + LF;
      prtData += "10,000" + utils.space(24 - utils.lengthb("10,000") - utils.lengthb(demandCash10KCnt)) + demandCash10KCnt + utils.space(18 - utils.lengthb(demandCash10KAmt)) + demandCash10KAmt + LF;
      prtData += " 5,000" + utils.space(24 - utils.lengthb(" 5,000") - utils.lengthb(demandCash5KCnt )) + demandCash5KCnt  + utils.space(18 - utils.lengthb(demandCash5KAmt )) + demandCash5KAmt  + LF;
      prtData += " 1,000" + utils.space(24 - utils.lengthb(" 1,000") - utils.lengthb(demandCash1KCnt )) + demandCash1KCnt  + utils.space(18 - utils.lengthb(demandCash1KAmt )) + demandCash1KAmt  + LF;
      prtData += "   500" + utils.space(24 - utils.lengthb("   500") - utils.lengthb(demandCash500Cnt  )) + demandCash500Cnt   + utils.space(18 - utils.lengthb(demandCash500Amt  )) + demandCash500Amt   + LF;
      prtData += "   100" + utils.space(24 - utils.lengthb("   100") - utils.lengthb(demandCash100Cnt  )) + demandCash100Cnt   + utils.space(18 - utils.lengthb(demandCash100Amt  )) + demandCash100Amt   + LF;
      prtData += "    50" + utils.space(24 - utils.lengthb("    50") - utils.lengthb(demandCash50Cnt   )) + demandCash50Cnt    + utils.space(18 - utils.lengthb(demandCash50Amt   )) + demandCash50Amt    + LF;
      prtData += "    10" + utils.space(24 - utils.lengthb("    10") - utils.lengthb(demandCash10Cnt   )) + demandCash10Cnt    + utils.space(18 - utils.lengthb(demandCash10Amt   )) + demandCash10Amt    + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)				

      prtData  = "총  액 : " + utils.space(42 - utils.lengthb("총  액 : ") - utils.lengthb(demandCashTotAmt)) + demandCashTotAmt + LF;				
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
    },

    //캐셔리포트 출력
    printCasherReport(bxlPosUtils) {  
      const posPrint = new PosPrint()
      const cashDeposit50kCnt    = this.numberWithCommas(this.depositInfo.cashDeposit50kCnt)
      const cashDeposit50kAmt    = this.numberWithCommas(this.depositInfo.cashDeposit50kCnt * 50000)
      const cashDeposit10kCnt    = this.numberWithCommas(this.depositInfo.cashDeposit10kCnt)
      const cashDeposit10kAmt    = this.numberWithCommas(this.depositInfo.cashDeposit10kCnt * 10000)
      const cashDeposit5kCnt     = this.numberWithCommas(this.depositInfo.cashDeposit5kCnt)
      const cashDeposit5kAmt     = this.numberWithCommas(this.depositInfo.cashDeposit5kCnt * 5000)
      const cashDeposit1kCnt     = this.numberWithCommas(this.depositInfo.cashDeposit1kCnt)
      const cashDeposit1kAmt     = this.numberWithCommas(this.depositInfo.cashDeposit1kCnt * 1000)
      const cashDeposit500Cnt    = this.numberWithCommas(this.depositInfo.cashDeposit500Cnt)
      const cashDeposit500Amt    = this.numberWithCommas(this.depositInfo.cashDeposit500Cnt * 500)
      const cashDeposit100Cnt    = this.numberWithCommas(this.depositInfo.cashDeposit100Cnt)
      const cashDeposit100Amt    = this.numberWithCommas(this.depositInfo.cashDeposit100Cnt * 100)
      const cashDeposit50Cnt     = this.numberWithCommas(this.depositInfo.cashDeposit50Cnt)
      const cashDeposit50Amt     = this.numberWithCommas(this.depositInfo.cashDeposit50Cnt * 50)
      const cashDeposit10Cnt     = this.numberWithCommas(this.depositInfo.cashDeposit10Cnt)
      const cashDeposit10Amt     = this.numberWithCommas(this.depositInfo.cashDeposit10Cnt * 10)
      const checkDeposit1000kCnt = this.numberWithCommas(this.depositInfo.checkDeposit1000kCnt)
      const checkDeposit1000kAmt = this.numberWithCommas(this.depositInfo.checkDeposit1000kCnt * 1000000)
      const checkDeposit500kCnt  = this.numberWithCommas(this.depositInfo.checkDeposit500kCnt)
      const checkDeposit500kAmt  = this.numberWithCommas(this.depositInfo.checkDeposit500kCnt * 500000)
      const checkDeposit300kCnt  = this.numberWithCommas(this.depositInfo.checkDeposit300kCnt)
      const checkDeposit300kAmt  = this.numberWithCommas(this.depositInfo.checkDeposit300kCnt * 300000)
      const checkDeposit100kCnt  = this.numberWithCommas(this.depositInfo.checkDeposit100kCnt)
      const checkDeposit100kAmt  = this.numberWithCommas(this.depositInfo.checkDeposit100kCnt * 100000)
      const checkDepositetcCnt   = this.numberWithCommas(this.depositInfo.checkDepositETCCnt)
      const checkDepositetcAmt   = this.numberWithCommas(this.depositInfo.checkDepositETCAmt)

      const prepareTotAmt = this.numberWithCommas(this.calculateInfoSummary.sumPrepareInitTotCnt)
      const prepareInitTotAmt = this.numberWithCommas(this.calculateInfoSummary.sumPrepareInitAmt)
      const prepareInitAddTotAmt = this.numberWithCommas(this.calculateInfoSummary.sumPrepareInitAddAmt)

      const saveCashAmt = this.numberWithCommas(this.calculateInfoSummary.saveCashAmt)
      const sumIwolAmt = this.numberWithCommas(this.calculateInfoSummary.sumIwolAmt)
      const demandCashAmt = this.numberWithCommas(this.calculateInfoSummary.demandCashAmt)

      const saleAmt = this.numberWithCommas(this.amtInfo.saleAmt)
      const pointAmt = this.numberWithCommas(this.payInfo.depDreampointAmt)
      const returnAmt = this.numberWithCommas(this.amtInfo.returnAmt)
      const adjustAmt = this.numberWithCommas(this.amtInfo.saleAmt - this.amtInfo.returnAmt - this.payInfo.depDreampointAmt)
      const creditCnt = this.numberWithCommas(this.amtInfo.creditCnt)
      const creditAmt = this.numberWithCommas(this.amtInfo.creditAmt)
        
      const cashTot = this.numberWithCommas(this.payInfoSummary.cashInfo.depAmt)
      const depCashAmt = this.numberWithCommas(this.payInfo.depCashAmt)
      const depGiftcardAmt = this.numberWithCommas(this.payInfo.depGiftcardAmt)
      const depTicketAmt = this.numberWithCommas(this.payInfo.depTicketAmt)

      const totNomalCnt = this.numberWithCommas(this.esignInfo.totEsignCnt + this.esignInfo.totHsignCnt + this.esignInfo.totAsignCnt + this.esignInfo.totEasyCnt)
      const totNomalAmt = this.numberWithCommas(this.esignInfo.totEsignAmt + this.esignInfo.totHsignAmt + this.esignInfo.totAsignAmt + this.esignInfo.totEasyAmt)
      const totHsignCnt = this.numberWithCommas(this.esignInfo.totHsignCnt)
      const totHsignAmt = this.numberWithCommas(this.esignInfo.totHsignAmt)
      const totCancelCnt = this.numberWithCommas(this.esignInfo.totEsignCancelCnt + this.esignInfo.totHsignCancelCnt + this.esignInfo.totAsignCancelCnt + this.esignInfo.totEasyCnt)
      const totCancelAmt = this.numberWithCommas(this.esignInfo.totEsignCancelAmt + this.esignInfo.totHsignCancelAmt + this.esignInfo.totAsignCancelAmt + this.esignInfo.totEasyAmt)
      const totHsignCancelCnt = this.numberWithCommas(this.esignInfo.totHsignCancelCnt)
      const totHsignCancelAmt = this.numberWithCommas(this.esignInfo.totHsignCancelAmt)
      
      this.posInfoPrint(bxlPosUtils) // 포스정보 출력
      posPrint.printStamp(bxlPosUtils)

      let prtData = LF + "Cashier Report(제출용)" + LF;
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)					
              
      prtData  = "*준비시재총액" + utils.space(42 - utils.lengthb("*준비시재총액") - utils.lengthb(prepareTotAmt         )) + prepareTotAmt          + LF;
      prtData += " **시재준비금" + utils.space(42 - utils.lengthb(" **시재준비금") - utils.lengthb(prepareInitTotAmt    )) + prepareInitTotAmt     + LF;
      prtData += " **시재추가금" + utils.space(42 - utils.lengthb(" **시재추가금") - utils.lengthb(prepareInitAddTotAmt)) + prepareInitAddTotAmt + LF;				
    
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)
              
      prtData  = "*판매총액"     + utils.space(42 - utils.lengthb("*판매총액"    ) - utils.lengthb(saleAmt   )) + saleAmt    + LF;		
      prtData += " **드림포인트" + utils.space(42 - utils.lengthb(" **드림포인트") - utils.lengthb(pointAmt  )) + pointAmt   + LF;		
      prtData += "*반품총액"     + utils.space(42 - utils.lengthb("*반품총액"    ) - utils.lengthb(returnAmt )) + returnAmt  + LF;															
      
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)
    
      prtData  = "*정산총액"  + utils.space(42 - utils.lengthb("*정산총액" ) - utils.lengthb(adjustAmt          )) + adjustAmt           + LF;
      prtData += "  카드정상" + utils.space(25 - utils.lengthb("  카드정상") - utils.lengthb(totNomalCnt      )) + totNomalCnt       + utils.space(17 - utils.lengthb(totNomalAmt      )) + totNomalAmt       + LF;
      prtData += "      수기" + utils.space(25 - utils.lengthb("      수기") - utils.lengthb(totHsignCnt       )) + totHsignCnt        + utils.space(17 - utils.lengthb(totHsignAmt       )) + totHsignAmt        + LF;
      prtData += "  카드반품" + utils.space(25 - utils.lengthb("  카드반품") - utils.lengthb(totCancelCnt      )) + totCancelCnt       + utils.space(17 - utils.lengthb(totCancelAmt      )) + totCancelAmt       + LF;
      prtData += "      수기" + utils.space(25 - utils.lengthb("      수기") - utils.lengthb(totHsignCancelCnt)) + totHsignCancelCnt + utils.space(17 - utils.lengthb(totHsignCancelAmt)) + totHsignCancelAmt + LF;
      prtData += " **외상"    + utils.space(25 - utils.lengthb(" **외상"   ) - utils.lengthb(creditCnt          )) + creditCnt           + utils.space(17 - utils.lengthb(creditAmt          )) + creditAmt           + LF;

      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)
    
      prtData  = "*보관시재"   + utils.space(42 - utils.lengthb("*보관시재"  ) - utils.lengthb(saveCashAmt  )) + saveCashAmt   + LF;
      prtData += " **이월시재" + utils.space(42 - utils.lengthb(" **이월시재") - utils.lengthb(sumIwolAmt  )) + sumIwolAmt   + LF;
      prtData += " **청구시재" + utils.space(42 - utils.lengthb(" **청구시재") - utils.lengthb(demandCashAmt)) + demandCashAmt + LF;
        
      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)
    
      prtData  = "*입금총액"   + utils.space(42 - utils.lengthb("*입금총액"  ) - utils.lengthb(cashTot)) + cashTot + LF;
      prtData += " **상품권"   + utils.space(42 - utils.lengthb(" **상품권"  ) - utils.lengthb(depGiftcardAmt)) + depGiftcardAmt + LF;
      prtData += " **선발행권" + utils.space(42 - utils.lengthb(" **선발행권") - utils.lengthb(depTicketAmt  )) + depTicketAmt   + LF;

      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
              
      prtData  = " **현금"         + utils.space(42 - utils.lengthb(" **현금"        ) - utils.lengthb(depCashAmt           )) + depCashAmt            + LF;
      prtData += "  5만원권현금"   + utils.space(25 - utils.lengthb("  5만원권현금"  ) - utils.lengthb(cashDeposit50kCnt   )) + cashDeposit50kCnt    + utils.space(17 - utils.lengthb(cashDeposit50kAmt   )) + cashDeposit50kAmt    + LF;
      prtData += "  1만원권현금"   + utils.space(25 - utils.lengthb("  1만원권현금"  ) - utils.lengthb(cashDeposit10kCnt   )) + cashDeposit10kCnt    + utils.space(17 - utils.lengthb(cashDeposit10kAmt   )) + cashDeposit10kAmt    + LF;
      prtData += "  5천원권현금"   + utils.space(25 - utils.lengthb("  5천원권현금"  ) - utils.lengthb(cashDeposit5kCnt    )) + cashDeposit5kCnt     + utils.space(17 - utils.lengthb(cashDeposit5kAmt    )) + cashDeposit5kAmt     + LF;
      prtData += "  1천원권현금"   + utils.space(25 - utils.lengthb("  1천원권현금"  ) - utils.lengthb(cashDeposit1kCnt    )) + cashDeposit1kCnt     + utils.space(17 - utils.lengthb(cashDeposit1kAmt    )) + cashDeposit1kAmt     + LF;
      prtData += "  5백원권현금"   + utils.space(25 - utils.lengthb("  5갭원권현금"  ) - utils.lengthb(cashDeposit500Cnt   )) + cashDeposit500Cnt    + utils.space(17 - utils.lengthb(cashDeposit500Amt   )) + cashDeposit500Amt    + LF;
      prtData += "  1백원권현금"   + utils.space(25 - utils.lengthb("  1백원권현금"  ) - utils.lengthb(cashDeposit100Cnt   )) + cashDeposit100Cnt    + utils.space(17 - utils.lengthb(cashDeposit100Amt   )) + cashDeposit100Amt    + LF;
      prtData += "  5십원권현금"   + utils.space(25 - utils.lengthb("  5십원권현금"  ) - utils.lengthb(cashDeposit50Cnt    )) + cashDeposit50Cnt     + utils.space(17 - utils.lengthb(cashDeposit50Amt    )) + cashDeposit50Amt     + LF;
      prtData += "  1십원권현금"   + utils.space(25 - utils.lengthb("  1십원권현금"  ) - utils.lengthb(cashDeposit10Cnt    )) + cashDeposit10Cnt     + utils.space(17 - utils.lengthb(cashDeposit10Amt    )) + cashDeposit10Amt     + LF;
      prtData += "  1백만원권수표" + utils.space(25 - utils.lengthb("  1백만원권수표") - utils.lengthb(checkDeposit1000kCnt)) + checkDeposit1000kCnt + utils.space(17 - utils.lengthb(checkDeposit1000kAmt)) + checkDeposit1000kAmt + LF;
      prtData += "  5십만원권수표" + utils.space(25 - utils.lengthb("  5십만원권수표") - utils.lengthb(checkDeposit500kCnt )) + checkDeposit500kCnt  + utils.space(17 - utils.lengthb(checkDeposit500kAmt )) + checkDeposit500kAmt  + LF;
      prtData += "  3십만원권수표" + utils.space(25 - utils.lengthb("  3십만원권수표") - utils.lengthb(checkDeposit300kCnt )) + checkDeposit300kCnt  + utils.space(17 - utils.lengthb(checkDeposit300kAmt )) + checkDeposit300kAmt  + LF;
      prtData += "  1십만원권수표" + utils.space(25 - utils.lengthb("  1십만원권수표") - utils.lengthb(checkDeposit100kCnt )) + checkDeposit100kCnt  + utils.space(17 - utils.lengthb(checkDeposit100kAmt )) + checkDeposit100kAmt  + LF;
      prtData += "  기타권종수표"  + utils.space(25 - utils.lengthb("  기타권종수표" ) - utils.lengthb(checkDepositetcCnt  )) + checkDepositetcCnt   + utils.space(17 - utils.lengthb(checkDepositetcAmt  )) + checkDepositetcAmt   + LF;													

      bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
      posPrint.printLine(bxlPosUtils)
    },

    //제휴카드 출력
    printWfCard(bxlPosUtils) {
      const saleDate = `${this.userInfo.saleDate.substr(0, 4)}년 ${this.userInfo.saleDate.substr(4, 2)}월 ${this.userInfo.saleDate.substr(6, 2)}일`
      const posPrint = new PosPrint()

      _.forEach(this.cardList, v => {  
        const ticketName = v.ticketName
        const saleCnt = this.numberWithCommas(v.saleCnt)
        const saleAmt = this.numberWithCommas(v.saleAmt)
        const creditCnt = this.numberWithCommas(v.creditCnt)
        const creditAmt = this.numberWithCommas(v.creditAmt)
        const totCnt = this.numberWithCommas(v.totCnt)
        const totAmt = this.numberWithCommas(v.totAmt)
        const lastDay =  `${v.lastDay.substr(0, 4)}년 ${v.lastDay.substr(4, 2)}월 ${v.lastDay.substr(6, 2)}일`
          
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             현   업    제   출    용                  ////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)

        let prtData = ""
        prtData = LF
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), ' ') + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서"+LF, 0, 0, false, false, false, 0, 1)
        bxlPosUtils.printText(LF + "*현업제출용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)
        
        prtData = ""
        prtData = LF
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(ticketName)) + ticketName + utils.space(1) + LF
        prtData = prtData + "소      속:" + utils.space(30 - utils.lengthb("")) + "" + utils.space(1) + LF
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF
  
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)						

        prtData = ""
        prtData = LF
        
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : ")," ") + LF
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF;	
        
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        prtData = LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)	
        bxlPosUtils.cutPaper(1)
    
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             보      관        용                  ////////////////////////							
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)
        
        prtData = "";
        prtData = LF
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), ' ') + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서", 0, 0, false, false, false, 0, 1)
        bxlPosUtils.printText(LF + "*보관용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)	
        
        prtData = ""
        prtData = LF
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(ticketName)) + ticketName + utils.space(1) + LF
        prtData = prtData + "소      속:" + utils.space(30 - utils.lengthb("")) + "" + utils.space(1) + LF
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF
            
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)				
        

        prtData = ""
        prtData = LF
        
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : ")," ") + LF
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF
      
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        prtData = LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)	
        bxlPosUtils.cutPaper(1)
      })
    },
    
    // 직원외상
    printEmpCredit(bxlPosUtils) {
      if (this.empCreditInfo) {
        const posPrint = new PosPrint()
        const saleDate = `${this.userInfo.saleDate.substr(0, 4)}년 ${this.userInfo.saleDate.substr(4, 2)}월 ${this.userInfo.saleDate.substr(6, 2)}일`
        const lastDay =  `${this.empCreditInfo.lastDay.substr(0, 4)}년 ${this.empCreditInfo.lastDay.substr(4, 2)}월 ${this.empCreditInfo.lastDay.substr(6, 2)}일`
        const saleCnt = this.numberWithCommas(this.empCreditInfo.saleCnt)
        const saleAmt = this.numberWithCommas(this.empCreditInfo.saleAmt)
        const creditCnt = this.numberWithCommas(this.empCreditInfo.creditCnt)
        const creditAmt = this.numberWithCommas(this.empCreditInfo.creditAmt)
        const totCnt = this.numberWithCommas(this.empCreditInfo.totCnt)
        const totAmt = this.numberWithCommas(this.empCreditInfo.totAmt)
        const empName = this.empCreditInfo.empName
        
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             현   업    제   출    용                  ////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)
        let prtData = "";
        prtData = LF;
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), " ") + LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서", 0, 0, false, false, false, 0, 1)
        bxlPosUtils.printText(LF + "*현업제출용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)	
        
        prtData = "";
        prtData = LF;
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF;
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF;
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF;
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(empName)) + empName + utils.space(1) + LF;
        prtData = prtData + "소      속:" + utils.space(30 - utils.lengthb("")) + "" + utils.space(1) + LF;
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF;
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF;
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 ";
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF;
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 ";
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF;
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 ";
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF;
  
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)		

        prtData = "";
        prtData = LF;
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : "), " ") + LF;
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF;	
        
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = "";
        prtData = LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)	
        bxlPosUtils.cutPaper(1)
      
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             보      관        용                  ////////////////////////							
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)
        
        prtData = "";
        prtData = LF;
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), " ") + LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서", 0, 0, false, false, false, 0, 1)
        bxlPosUtils.printText(LF + "*보관용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)	
        
        prtData = ""
        prtData = LF
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(empName)) + empName + utils.space(1) + LF
        prtData = prtData + "소      속:" + utils.space(30 - utils.lengthb("")) + "" + utils.space(1) + LF
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF
            
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)					
        

        prtData = "";
        prtData = LF;
        
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : "), " ") + LF;
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF;	
      
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = "";
        prtData = LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)	
        bxlPosUtils.cutPaper(1)			
      }
    },

    // 판촉사원
    printWfSaleCredit(bxlPosUtils) {
      const saleDate = `${this.userInfo.saleDate.substr(0, 4)}년 ${this.userInfo.saleDate.substr(4, 2)}월 ${this.userInfo.saleDate.substr(6, 2)}일`
      const posPrint = new PosPrint()

      _.forEach(this.saleCreditList, v => {  
        const lastDay =  `${v.lastDay.substr(0, 4)}년 ${v.lastDay.substr(4, 2)}월 ${v.lastDay.substr(6, 2)}일`
        const saleCnt = this.numberWithCommas(v.saleCnt)
        const saleAmt = this.numberWithCommas(v.saleAmt)
        const creditCnt = this.numberWithCommas(v.creditCnt)
        const creditAmt = this.numberWithCommas(v.creditAmt)
        const totCnt = this.numberWithCommas(v.totCnt)
        const totAmt = this.numberWithCommas(v.totAmt)
        const creditName = v.creditName
          
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             현   업    제   출    용                  ////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)
        let prtData = ""
        prtData = LF
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), " ") + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서", 0, 0, false, false, false, 0, 1)    
        bxlPosUtils.printText(LF + "*현업제출용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)					
        
        prtData = "";
        prtData = LF;
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(creditName)) + creditName + utils.space(1) + LF
        
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF;
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF;
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF
  
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)					

        prtData = "";
        prtData = LF
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : "), " ") + LF
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = "";
        prtData = LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)					
        bxlPosUtils.cutPaper(1)
    
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////             보      관        용                  ////////////////////////							
        //////////////////////////////////////////////////////////////////////////////////////////
        posPrint.printStamp(bxlPosUtils)
        prtData = ""
        prtData = LF
        prtData = prtData + saleDate.padEnd(42 - utils.lengthb(saleDate), " ") + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        bxlPosUtils.printText("외상신청서", 0, 0, false, false, false, 0, 1)
        bxlPosUtils.printText(LF + "*보관용*" + LF, 0, 0, false, false, false, 0, 1)

        posPrint.printLine(bxlPosUtils)			
        
        prtData = ""
        prtData = LF
        prtData = prtData + "포  스  ID:" + utils.space(30 - utils.lengthb(this.posInfo.posId)) + this.posInfo.posId + utils.space(1) + LF
        prtData = prtData + "포  스  명:" + utils.space(30 - utils.lengthb(this.posInfo.posNm)) + this.posInfo.posNm + utils.space(1) + LF
        prtData = prtData + "근  무  자:" + utils.space(30 - utils.lengthb(this.userInfo.userName)) + this.userInfo.userName + utils.space(1) + LF
        prtData = prtData + "신  청  자:" + utils.space(30 - utils.lengthb(creditName)) + creditName + utils.space(1) + LF
        
        prtData = prtData + "발생  일자:" + utils.space(30 - utils.lengthb(saleDate)) + saleDate + utils.space(1) + LF;
        prtData = prtData + "회입  일자:" + utils.space(30 - utils.lengthb(lastDay)) + lastDay + utils.space(1) + LF;
        
        prtData = prtData + "매      출:" + utils.space(6 - utils.lengthb(saleCnt))   + saleCnt   + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(saleAmt))   + saleAmt   + " 원 " + LF
        prtData = prtData + "환      불:" + utils.space(6 - utils.lengthb(creditCnt)) + creditCnt + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(creditAmt)) + creditAmt + " 원 " + LF
        prtData = prtData + "총      계:" + utils.space(6 - utils.lengthb(totCnt))    + totCnt    + " 건 "
        prtData = prtData +                 utils.space(16 - utils.lengthb(totAmt))    + totAmt    + " 원 " + LF
            
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)			

        prtData = ""
        prtData = LF
        prtData = prtData + "담당매니저 확인 : ".padEnd(42 - utils.lengthb("담당매니저 확인 : "), " ") + LF
        prtData = prtData.padEnd(42 - utils.lengthb("(인)"), " ") + "(인)" + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        
        prtData = ""
        prtData = LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)		
        bxlPosUtils.cutPaper(1)	               
      })
    },

    // 티켓별 집계 출력
    printTicket(bxlPosUtils) {
      if(this.ticketList.length > 0){
        const posPrint = new PosPrint()
        posPrint.printStamp(bxlPosUtils)
        let prtData = `${this.userInfo.saleDate.substr(0, 4)}년 ${this.userInfo.saleDate.substr(4, 2)}월 ${this.userInfo.saleDate.substr(6, 2)}일${LF}`
        prtData = prtData + "POS 번호 : " + this.posInfo.posId + LF
        prtData = prtData + "매    장 : " + this.posInfo.posNm + LF + LF
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)

        bxlPosUtils.printText("티켓별 정산집계" + LF, 0, 0, false, false, false, 0, 1)
        posPrint.printLine(bxlPosUtils)
        
        prtData = "티켓명" + utils.space(28 - utils.lengthb("티켓명") - utils.lengthb("인원")) + "인원" + utils.space(14 - utils.lengthb("판매금액")) + "판매금액" + LF;
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        posPrint.printLine(bxlPosUtils)

        let sumInwonCnt = 0
        let sumSaleAmt = 0
        
        _.forEach(this.ticketList, v => {       
          const ticketName = v.itemNm
          const inwonCnt = v.inwonCnt
          const saleAmt  = v.saleAmt

          sumInwonCnt += inwonCnt
          sumSaleAmt += saleAmt
          
          prtData  = ticketName + utils.space(28 - utils.lengthb(ticketName) - utils.lengthb(inwonCnt)) + inwonCnt + utils.space(14 - utils.lengthb(saleAmt)) + saleAmt  + LF;
          bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)
        })

        sumInwonCnt = this.numberWithCommas(sumInwonCnt)
        sumSaleAmt = this.numberWithCommas(sumSaleAmt)
        
        posPrint.printLine(bxlPosUtils)
        
        prtData  = "총가입인원 : ".padEnd(29 - utils.lengthb(sumInwonCnt), " ") + sumInwonCnt + LF;
        prtData += "총티켓매수 : ".padEnd(29 - utils.lengthb(sumInwonCnt), " ") + sumInwonCnt + LF;
        prtData += "총티켓금액 : ".padEnd(29 - utils.lengthb(sumSaleAmt ), " ") + sumSaleAmt  + LF + LF;
          
        bxlPosUtils.printText(prtData, 0, 0, false, false, false, 0, 0)	
        bxlPosUtils.cutPaper(1)	   
      }
    }
  } //method
}