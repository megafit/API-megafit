const { tblUsers, tblStaffs, tblMembers, tblPackageMemberships, tblCheckinCheckouts, tblRoles, tblCategoryMemberships, tblDataSizeMembers } = require("../models")
const { compare, hash } = require("../helpers/bcrypt")
const { sign, verify } = require("../helpers/jwt")
const QRCode = require('qrcode')
const Op = require('sequelize').Op
const excelToJson = require('convert-excel-to-json');

class users {

  static async signup(req, res) {
    try {
      let findNew

      let newUser = {
        username: req.body.username,
        password: hash(req.body.password),
        fullname: req.body.fullname,
        nickname: req.body.nickname,
        noKtp: req.body.noKtp,
        avatar: req.file ? req.file.path : `/uploads/icon_user.png`,
        dateOfBirth: new Date(req.body.dateOfBirth),
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        igAccount: req.body.igAccount,
        roleId: req.body.roleId,
        haveWhatsapp: req.body.haveWhatsapp,
        flagActive: req.body.flagActive
      }

      let createUser = await tblUsers.create(newUser)

      if (Number(req.body.roleId) !== 4) {		//1 superadmin, 2 admin, 3 pt, 4 member 
        let createStaff, updateStaff

        let newStaff = {
          userId: createUser.null,
          positionId: req.body.positionId,
          isPermanent: req.body.isPermanent,
          available: req.body.available
        }

        if (createUser) createStaff = await tblStaffs.create(newStaff)

        let nameImageCard = createStaff.null
        await QRCode.toFile(`./qr/${nameImageCard}.png`, `${nameImageCard}`, {
          color: {
            dark: '#000',
            light: '#FFF' //background
          }
        })

        if (createStaff) updateStaff = await tblStaffs.update({ cardImage: `/qr/${nameImageCard}.png` }, { where: { userId: createStaff.userId } })

        if (updateStaff) findNew = await tblUsers.findByPk(createStaff.userId, { include: [{ model: tblStaffs }] })

      } else {
        let createMember, updateMember

        let newMember = {
          userId: createUser.null,
          cardImage: '',
          activeExpired: req.body.activeExpired,
          ptSession: req.body.ptSession || 0,
          packageMembershipId: req.body.packageMembershipId
        }

        if (createUser) createMember = await tblMembers.create(newMember)

        let nameImageCard = createMember.null
        await QRCode.toFile(`./qr/${nameImageCard}.png`, `${nameImageCard}`, {
          color: {
            dark: '#000',
            light: '#FFF' //background
          }
        })

        if (createMember) updateMember = await tblMembers.update({ cardImage: `/qr/${nameImageCard}.png` }, { where: { userId: createMember.userId } })

        if (updateMember) findNew = await tblUsers.findByPk(createMember.userId, { include: [{ model: tblMembers, include: [{ model: tblPackageMemberships }] }] })
      }

      if (findNew) res.status(201).json({ message: "Success", data: findNew })

    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async signin(req, res) {
    let detailUser, dataSend
    try {
      let userLogin = await tblUsers.findOne({ where: { username: req.body.username }, include: [{ model: tblStaffs }, { model: tblMembers }] })
      if (userLogin) {
        if (compare(req.body.password, userLogin.password)) {
          let token = sign({ userId: userLogin.userId })

          // detailUser = await tblUsers.findByPk(userLogin.userId, {
          // 	where: { username: req.body.username },
          // 	include: [{ model: tblStaffs }, { model: tblStaffs }]
          // })

          // console.log(detailUser)

          // dataSend = { token, nickname: detailUser.nickname, gender: detailUser.gender }

          // if (detailUser.roleId === 4) {
          // 	dataSend = {
          // 		token, nickname: detailUser.nickname, gender
          // 	}
          // } else {
          // 	dataSend.isAvailable = detailUser.tblStaff.available
          // }
          console.log(userLogin)
          res.status(200).json({
            token,
            nickname: userLogin.nickname,
            fullname: userLogin.fullname,
            userId: userLogin.userId,
            roleId: userLogin.roleId,
            positionId: userLogin.tblStaff ? userLogin.tblStaff.positionId : null,
            hasConfirmTermAndCondition: userLogin.tblMember ? userLogin.tblMember.hasConfirmTermAndCondition : null
          })
        } else {
          throw "Username/password invalid"
        }
      } else {
        throw "Username/password invalid"
      }
    } catch (Error) {
      console.log(Error)
      if (Error === "Username/password invalid") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    let lockerKey = null, checkId = null

    try {
      if (req.query.idMember) {
        let detailMember = await tblUsers.findOne({
          // where: { username: req.body.username },  bila nyari username juga
          include: [{ model: tblMembers, where: { memberId: req.query.idMember } }]
        })

        //bila members
        if (detailMember) {
          //cek sudah expired atau belum
          if (new Date(detailMember.tblMember.activeExpired) < new Date()) {
            await tblUsers.update({ flagActive: false }, { where: { userId: detailMember.userId } })
            await tblMembers.update({ ptSession: 0 }, { where: { userId: detailMember.userId } })

            detailMember.flagActive = 0
          }

          let checkLockerkey = await tblCheckinCheckouts.findOne({ where: { userId: detailMember.userId, lockerKey: { [Op.ne]: 0 } } })

          if (checkLockerkey != null) {
            lockerKey = checkLockerkey.lockerKey
            checkId = checkLockerkey.checkId
          }

          res.status(200).json({ message: "Success33", data: detailMember, lockerKey, checkId })

        } else {

          let detailUser = await tblUsers.findByPk(req.params.id, {
            // where: { username: req.body.username },  bila nyari username juga
            include: [{ model: tblStaffs }, { model: tblMembers }]
          })

          //bila members
          if (detailUser) {
            if (detailUser.tblMember) {
              //cek sudah expired atau belum
              if (new Date(detailUser.tblMember.activeExpired) < new Date()) {
                await tblUsers.update({ flagActive: false }, { where: { userId: detailUser.userId } })
                await tblMembers.update({ ptSession: 0 }, { where: { userId: detailUser.userId } })

                detailUser.flagActive = 0
              }

              let checkLockerkey = await tblCheckinCheckouts.findOne({ where: { userId: detailUser.userId, lockerKey: { [Op.ne]: 0 } } })

              if (checkLockerkey != null) {
                lockerKey = checkLockerkey.lockerKey
                checkId = checkLockerkey.checkId
              }
            }
            res.status(200).json({ message: "Success33", data: detailUser, lockerKey, checkId })
          } else {
            throw "Data not found"
          }
        }

      } else {
        console.log(req.params.id)
        let detailUser = await tblUsers.findByPk(req.params.id, {
          // where: { username: req.body.username },  bila nyari username juga
          include: [{ model: tblStaffs }, { model: tblMembers }]
        })

        //bila members
        if (detailUser) {
          if (detailUser.tblMember) {
            //cek sudah expired atau belum
            if (new Date(detailUser.tblMember.activeExpired) < new Date()) {
              await tblUsers.update({ flagActive: false }, { where: { userId: detailUser.userId } })
              await tblMembers.update({ ptSession: 0 }, { where: { userId: detailUser.userId } })

              detailUser.flagActive = 0
            }

            let checkLockerkey = await tblCheckinCheckouts.findOne({ where: { userId: detailUser.userId, lockerKey: { [Op.ne]: 0 } } })

            if (checkLockerkey != null) {
              lockerKey = checkLockerkey.lockerKey
              checkId = checkLockerkey.checkId
            }
          }
        }

        if (detailUser) {
          if (detailUser.tblMember) res.status(200).json({ message: "Success33", data: detailUser, lockerKey, checkId })
          else res.status(200).json({ message: "Success33", data: detailUser })
        }

        else { //search staff
          let detailStaff = await tblUsers.findOne({
            include: [{ model: tblStaffs, where: { staffId: req.params.id } }]
          })

          if (detailStaff) res.status(200).json({ message: "Success1", data: detailStaff })
          else {  //search member
            let detailMember = await tblUsers.findOne({
              include: [{ model: tblMembers, where: { memberId: req.params.id } }]
            })

            //cek sudah expired atau belum
            if (new Date(detailMember.tblMember.activeExpired) < new Date()) {
              await tblUsers.update({ flagActive: false }, { where: { userId: detailUser.userId } })
              await tblMembers.update({ ptSession: 0 }, { where: { userId: detailUser.userId } })

              detailUser.flagActive = 0
            }

            let checkLockerkey = await tblCheckinCheckouts.findOne({ where: { userId: detailMember.userId, lockerKey: { [Op.ne]: 0 } } })

            if (checkLockerkey != null) {
              lockerKey = checkLockerkey.lockerKey
              checkId = checkLockerkey.checkId
            }

            if (detailMember) res.status(200).json({ message: "Success2", data: detailMember, lockerKey, checkId })
            else throw "Data not found"
          }
        }
      }
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    try {
      let data
      console.log(req.query)
      if (req.query.only === 'member') {
        data = await tblUsers.findAll({ include: [{ required: true, model: tblMembers, include: [{ model: tblPackageMemberships }] }, { model: tblRoles }] })
      } else if (req.query.only === 'staff') {
        data = await tblUsers.findAll({ where: { userId: { [Op.not]: 1 } }, include: [{ required: true, model: tblStaffs }, { model: tblRoles }] })
      } else {
        data = await tblUsers.findAll({ include: [{ model: tblStaffs }, { model: tblMembers, include: [{ model: tblPackageMemberships }] }, { model: tblRoles }] })
      }

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async update(req, res) {
    try {
      let exeUpdate, newData
      if (req.query['active-member'] === "true") {
        exeUpdate = await tblMembers.update({ activeDate: new Date() }, { where: { userId: req.params.id } })
      } else if (req.query['change-password'] === "true") { // Change password
        if (compare(req.body.passwordLama, req.user.password)) {
          newData = {
            password: hash(req.body.passwordBaru),
          }

          exeUpdate = await tblUsers.update(newData, {
            where: { userId: req.user.userId }
          })

        } else {
          throw "password salah"
        }
      } else if (req.query['data-size'] === "true") { //Input Data Size
        let member = await tblMembers.findOne({ where: { userId: req.params.id } })

        await tblMembers.update({ hasConfirmTermAndCondition: true }, { where: { memberId: member.memberId } })

        let oldData = await tblDataSizeMembers.findOne({
          where: { memberId: member.memberId },
          order: [
            ["id", "DESC"]
          ]
        })
        console.log(req.body)
        let newData = {
          umur: Number(req.body.umur) !== 0 ? req.body.umur : (oldData && oldData.umur ? oldData.umur : 0),
          height: Number(req.body.height) !== 0 ? req.body.height : (oldData && oldData.height ? oldData.height : 0),
          weight: Number(req.body.weight) !== 0 ? req.body.weight : (oldData && oldData.weight ? oldData.weight : 0),
          triceps: Number(req.body.triceps) !== 0 ? req.body.triceps : (oldData && oldData.triceps ? oldData.triceps : 0),
          dada: Number(req.body.dada) !== 0 ? req.body.dada : (oldData && oldData.dada ? oldData.dada : 0),
          perut: Number(req.body.perut) !== 0 ? req.body.perut : (oldData && oldData.perut ? oldData.perut : 0),
          pinggul: Number(req.body.pinggul) !== 0 ? req.body.pinggul : (oldData && oldData.pinggul ? oldData.pinggul : 0),
          pinggang: Number(req.body.pinggang) !== 0 ? req.body.pinggang : (oldData && oldData.pinggang ? oldData.pinggang : 0),
          paha: Number(req.body.paha) !== 0 ? req.body.paha : (oldData && oldData.paha ? oldData.paha : 0),
          memberId: member.memberId
        }

        exeUpdate = await tblDataSizeMembers.create(newData)

      } else {
        let newUserData = {}
        if (req.body.phone) newUserData.phone = req.body.phone
        if (req.body.email) newUserData.email = req.body.email
        if (req.body.username) newUserData.username = req.body.username

        exeUpdate = await tblUsers.update(newUserData, { where: { userId: req.params.id } })
      }

      let dataReturn = await tblUsers.findByPk(req.params.id, {
        include: [{ model: tblStaffs }, {
          model: tblMembers, include: [{
            model: tblDataSizeMembers, order: [
              ["createAt", "DESC"]
            ]
          }]
        }]
      })

      if (exeUpdate) res.status(200).json({ message: "Success", data: dataReturn })
    } catch (Error) {
      console.log('line 232 =', Error)
      if (Error === 'password salah') res.status(400).json({ msg: "Username/password invalid" })
      else res.status(500).json({ Error })
    }
  }

  static async checkToken(req, res) {
    try {
      let userLogin = await tblUsers.findOne({ where: { userId: req.user.userId }, include: [{ model: tblStaffs }, { model: tblMembers }] })

      res.status(200).json({
        nickname: userLogin.nickname,
        fullname: userLogin.fullname,
        userId: userLogin.userId,
        roleId: userLogin.roleId,
        positionId: userLogin.tblStaff ? userLogin.tblStaff.positionId : null,
        hasConfirmTermAndCondition: userLogin.tblMember ? userLogin.tblMember.hasConfirmTermAndCondition : null
      })

    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async importExcel(req, res) {
    try {
      const data = excelToJson({
        sourceFile: `/${req.file.path}`,
        sheets: [{
          name: 'member',
          header: {
            rows: 1
          },
          columnToKey: {
            A: "idMember",
            B: "namaLengkap",
            C: "namaPanggilan",
            D: "username",
            E: "noKtp",
            F: "tanggalLahir",
            G: "email",
            H: "nomorHp",
            I: "kelamin",
            J: "akunIg",
            K: "adaWhatsapp",
            L: "tanggalAktifasiMember",
            M: "tanggalKadarluasaMember",
            N: "sesiPT",
            O: "paketMembership",
          }
        }, {
          name: 'staff',
          header: {
            rows: 1
          },
          columnToKey: {
            A: "idStaff",
            B: "namaLengkap",
            C: "namaPanggilan",
            D: "username",
            E: "noKtp",
            F: "tanggalLahir",
            G: "email",
            H: "nomorHp",
            I: "kelamin",
            J: "akunIg",
            K: "adaWhatsapp",
            L: "position",
            M: "role",
            N: "jamMasuk"
          }
        }, {
          name: 'package',
          header: {
            rows: 1
          },
          columnToKey: {
            A: "packageMembershipId",
            B: "package",
            C: "categoryMembership",
            D: "times",
            E: "price",
            F: "startPromo",
            G: "endPromo",
            H: "access",
            I: "adminFee",
            J: "activeMember",
            K: "sessionPtHours"
          }
        }]
      })

      // Package
      if (data.package.length > 0) {
        let kategori = await tblCategoryMemberships.findAll()

        await data.package.forEach(async element => {
          try {
            let newData = {
              packageMembershipId: element.packageMembershipId,
              package: element.package,
              times: element.times,
              price: element.price,
              startPromo: element.startPromo,
              endPromo: element.endPromo,
              access: element.access,
              adminFee: element.adminFee,
              activeMember: element.activeMember,
              flagActive: 1,
              sessionPtHours: element.sessionPtHours
            }

            // categoryMembershipId: String(element.noKtp),
            let selectKategori
            if (element.categoryMembership === String) {
              selectKategori = await kategori.find(el => el.categoryMembership.toLowerCase() === element.categoryMembership.toLowerCase())
            } else {
              selectKategori = await kategori.find(el => el.categoryMembership === element.categoryMembership)
            }

            if (selectKategori) {
              newData.categoryMembershipId = selectKategori.categoryMembershipId
            } else {
              let createPackage = await tblCategoryMemberships.create({ categoryMembership: element.categoryMembership })

              newData.categoryMembershipId = createPackage.null
            }

            await tblPackageMemberships.create(newData)


          } catch (Error) {
            console.log(Error)
          }
        })
      }

      // Member
      if (data.member.length > 0) {
        await data.member.forEach(async element => {
          try {
            let createMember, updateMember

            let newUser = {
              fullname: element.namaLengkap,
              nickname: element.namaPanggilan,
              noKtp: String(element.noKtp),
              avatar: "./asset/icon_user.png",
              dateOfBirth: new Date(element.tanggalLahir),
              email: element.email,
              phone: element.nomorHp,
              gender: element.kelamin,
              igAccount: element.akunIg,
              haveWhatsapp: element.adaWhatsapp.toLowerCase() === 'iya' ? 1 : 0,

              roleId: 4,
              flagActive: 1,

              username: element.username,
              password: hash('12345'),
            }

            let createUser = await tblUsers.create(newUser)

            let newMember = {
              memberId: element.idMember,
              userId: createUser.null,
              activeDate: element.tanggalAktifasiMember,
              activeExpired: element.tanggalKadarluasaMember,
              ptSession: element.sesiPT || 0,
              cardImage: "",
              packageMembershipId: element.paketMembership
            }

            if (createUser) createMember = await tblMembers.create(newMember)

            let nameImageCard = element.idMember

            await QRCode.toFile(`./qr/${nameImageCard}.png`, `${nameImageCard}`, {
              color: {
                dark: '#000',
                light: '#FFF' //background
              }
            })

            if (createMember) updateMember = await tblMembers.update({ cardImage: `/qr/${nameImageCard}.png` }, { where: { memberId: nameImageCard } })

          } catch (Error) {
            console.log(Error)
          }
        });
      }

      // Staff
      if (data.staff.length > 0) {
        await data.staff.forEach(async element => {
          try {
            let createStaff, updateStaff

            let newUser = {
              fullname: element.namaLengkap,
              nickname: element.namaPanggilan,
              noKtp: String(element.noKtp),
              avatar: element.avatar || "./asset/icon_user.png",
              dateOfBirth: new Date(element.tanggalLahir),
              email: element.email,
              phone: element.nomorHp,
              gender: element.kelamin,
              igAccount: element.akunIg,
              haveWhatsapp: element.adaWhatsapp.toLowerCase() === 'iya' ? 1 : 0,

              flagActive: 1,

              username: element.username,
              password: hash('12345'),
            }

            if (element.role.toLowerCase() === 'admin') {
              newUser.roleId = 2
            } else if (element.role.toLowerCase() === 'staff') {
              newUser.roleId = 3
            }

            let createUser = await tblUsers.create(newUser)

            let newStaff = {
              staffId: element.idStaff,
              userId: createUser.null,
              isPermanent: element.jamMasuk.toLowerCase() === "shift" ? 0 : 1,
              positionId: element.position.toLowerCase() === "pt" ? 3 : 2,
              available: 1
            }

            if (createUser) createStaff = await tblStaffs.create(newStaff)

            let nameImageCard = createStaff.null

            await QRCode.toFile(`./qr/${nameImageCard}.png`, `${nameImageCard}`, {
              color: {
                dark: '#000',
                light: '#FFF' //background
              }
            })

            if (createStaff) updateStaff = await tblStaffs.update({ cardImage: `/qr/${nameImageCard}.png` }, { where: { userId: createStaff.userId } })

          } catch (Error) {
            console.log(Error)
          }
        })
      }

      res.status(200).json({ message: "Success", data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }

  }

}

module.exports = users