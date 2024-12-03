exports.up = async function (knex) {
    return await knex('facility_images').insert([
        // Sofitel Legend Metropole Hanoi
        { facility_id: 'f001', img_id: 1, img_url: 'https://i.imgur.com/2au75H2.jpg' },
        { facility_id: 'f001', img_id: 2, img_url: 'https://i.imgur.com/m2yEFxG.jpg' },
        { facility_id: 'f001', img_id: 3, img_url: 'https://i.imgur.com/nIAK0zM.jpg' },
        // InterContinental Saigon
        { facility_id: 'f002', img_id: 1, img_url: 'https://i.imgur.com/qvQfxc8.jpg' },
        { facility_id: 'f002', img_id: 2, img_url: 'https://i.imgur.com/qvQfxc8.jpg' },
        { facility_id: 'f002', img_id: 3, img_url: 'https://i.imgur.com/BrTI1zt.jpg' },
        // JW Marriott Hanoi
        { facility_id: 'f003', img_id: 1, img_url: 'https://i.imgur.com/GjTR9Wa.jpg' },
        { facility_id: 'f003', img_id: 2, img_url: 'https://i.imgur.com/VPEm6NL.jpg' },
        { facility_id: 'f003', img_id: 3, img_url: 'https://i.imgur.com/kMofrms.jpg' },
        // Park Hyatt Saigon
        { facility_id: 'f004', img_id: 1, img_url: 'https://i.imgur.com/zJ9pd3P.jpg' },
        { facility_id: 'f004', img_id: 2, img_url: 'https://i.imgur.com/mtium3x.jpg' },
        { facility_id: 'f004', img_id: 3, img_url: 'https://i.imgur.com/TnUJlQa.jpg' },
        // The Reverie Saigon
        { facility_id: 'f005', img_id: 1, img_url: 'https://i.imgur.com/l7yOd3y.jpg' },
        { facility_id: 'f005', img_id: 2, img_url: 'https://i.imgur.com/NmOxmnq.jpg' },
        { facility_id: 'f005', img_id: 3, img_url: 'https://i.imgur.com/WJwEgZp.jpg' },
        // Melia Hanoi
        { facility_id: 'f006', img_id: 1, img_url: 'https://i.imgur.com/JGywZ1G.jpg' },
        { facility_id: 'f006', img_id: 2, img_url: 'https://i.imgur.com/R4mkLER.jpg' },
        { facility_id: 'f006', img_id: 3, img_url: 'https://i.imgur.com/j7CxLFB.jpg' },
        // Pullman Saigon Centre
        { facility_id: 'f007', img_id: 1, img_url: 'https://i.imgur.com/eIMF4oy.jpg' },
        { facility_id: 'f007', img_id: 2, img_url: 'https://i.imgur.com/j9xhsEp.jpg' },
        { facility_id: 'f007', img_id: 3, img_url: 'https://i.imgur.com/IESsI3N.jpg' },
        // Novotel Danang Premier
        { facility_id: 'f008', img_id: 1, img_url: 'https://i.imgur.com/FVXMrbg.jpg' },
        { facility_id: 'f008', img_id: 2, img_url: 'https://i.imgur.com/ZH1UPU4.jpg' },
        { facility_id: 'f008', img_id: 3, img_url: 'https://i.imgur.com/E70EuP7.jpg' },
        // Sammy Dalat
        { facility_id: 'f009', img_id: 1, img_url: 'https://i.imgur.com/Nzkhhb4.jpg' },
        { facility_id: 'f009', img_id: 2, img_url: 'https://imgur.com/zNXb321.jpg' },
        { facility_id: 'f009', img_id: 3, img_url: 'https://i.imgur.com/9Q6wfEB.jpg' },
        // Khách sạn Melia Hanoi
        { facility_id: 'f010', img_id: 1, img_url: 'https://i.imgur.com/PbpvWXT.jpg' },
        { facility_id: 'f010', img_id: 2, img_url: 'https://i.imgur.com/G6LL5AB.jpg' },
        { facility_id: 'f010', img_id: 3, img_url: 'https://i.imgur.com/2NEsFnh.jpg' },
        // Hà Nội
        { facility_id: 'f011', img_id: 1, img_url: 'https://i.imgur.com/bu4vbg3.jpg' },
        { facility_id: 'f011', img_id: 2, img_url: 'https://i.imgur.com/IatWlFN.jpg' },
        { facility_id: 'f011', img_id: 3, img_url: 'https://i.imgur.com/ifXzKrO.jpg' },
        { facility_id: 'f012', img_id: 1, img_url: 'https://i.imgur.com/lGPWMo3.jpg' },
        { facility_id: 'f012', img_id: 2, img_url: 'https://i.imgur.com/5Q7dwyM.jpg' },
        { facility_id: 'f012', img_id: 3, img_url: 'https://i.imgur.com/ZntDAYa.jpg' },
        // Hồ Chí Minh
        { facility_id: 'f013', img_id: 1, img_url: 'https://i.imgur.com/mkZiubO.png' },
        { facility_id: 'f013', img_id: 2, img_url: 'https://i.imgur.com/7vMiYGS.png' },
        { facility_id: 'f013', img_id: 3, img_url: 'https://i.imgur.com/ulN6zHS.png' },
        { facility_id: 'f014', img_id: 1, img_url: 'https://i.imgur.com/loeIOMP.jpg' },
        { facility_id: 'f014', img_id: 2, img_url: 'https://i.imgur.com/oNRI9qd.jpg' },
        { facility_id: 'f014', img_id: 3, img_url: 'https://i.imgur.com/6slbw0o.jpg' },
        // Phan Thiết
        { facility_id: 'f015', img_id: 1, img_url: 'https://i.imgur.com/U3EpPiQ.jpg' },
        { facility_id: 'f015', img_id: 2, img_url: 'https://i.imgur.com/sSgk91Z.jpg' },
        { facility_id: 'f015', img_id: 3, img_url: 'https://i.imgur.com/7rm6kru.jpg' },
        // Đà Nẵng
        { facility_id: 'f016', img_id: 1, img_url: 'https://i.imgur.com/bn8PiLb.jpg' },
        { facility_id: 'f016', img_id: 2, img_url: 'https://i.imgur.com/wYKgyLM.png' },
        { facility_id: 'f016', img_id: 3, img_url: 'https://i.imgur.com/iaCXYP8.png' },
        { facility_id: 'f017', img_id: 1, img_url: 'https://i.imgur.com/H4s0fjw.jpg' },
        { facility_id: 'f017', img_id: 2, img_url: 'https://i.imgur.com/vM7Rzcb.jpg' },
        { facility_id: 'f017', img_id: 3, img_url: 'https://i.imgur.com/gJjykRo.jpg' },
        // Lâm Đồng
        { facility_id: 'f018', img_id: 1, img_url: 'https://i.imgur.com/K3mVSDn.jpg' },
        { facility_id: 'f018', img_id: 2, img_url: 'https://i.imgur.com/kgSrTVH.jpg' },
        { facility_id: 'f018', img_id: 3, img_url: 'https://i.imgur.com/yKMU1GR.jpg' }
    ]);
};

exports.down = async function (knex) {
    return await knex('facility_images').del();
};
