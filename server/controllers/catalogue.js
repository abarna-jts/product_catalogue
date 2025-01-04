import fs from "fs";
import db from "../db.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("logo");

export const createCatalogue = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    const {
      catalogueOwnerId,
      catalogueName,
      companyName,
      aboutCompany,
      companyAddress,
      emailAddress,
      contactNumber,
    } = req.body;
    const logoPath = req.file ? req.file.path : null;

    const q =
      "INSERT into catalogues (catalogue_owner_id, catalogue_name, company_name, about_company, company_address, email_address, contact_number, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      catalogueOwnerId,
      catalogueName,
      companyName,
      aboutCompany,
      companyAddress,
      emailAddress,
      contactNumber,
      logoPath,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database Error", error: err });
      }
      res
        .status(201)
        .json({ message: "Catalogue Created Successfully", data: data });
    });
  });
};

export const getCatalogues = (req, res) => {
  const ownerId = req.query.ownerId;

  const q =
    "SELECT * from catalogues WHERE catalogue_owner_id = ? ORDER BY id DESC";

  db.query(q, [ownerId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }
    return res.status(200).json(data);
  });
};

export const getCatalogueById = (req, res) => {
  const CatalogueId = req.query.catalogue_id;

  const q = "SELECT * from catalogues WHERE id = ?";

  db.query(q, [CatalogueId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }
    return res.status(200).json(data);
  });
};

export const editCatalogue = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    const {
      catalogueName,
      companyName,
      aboutCompany,
      companyAddress,
      emailAddress,
      contactNumber,
    } = req.body;

    const catalogueId = req.params.id;
    const logoPath = req.file ? req.file.path : null;

    // Fetch the existing catalogue to delete the old logo
    const selectQuery = "SELECT logo FROM catalogues WHERE id = ?";
    db.query(selectQuery, [catalogueId], (selectErr, selectData) => {
      if (selectErr) {
        return res.status(500).json({
          message: "Failed to retrieve existing data",
          error: selectErr,
        });
      }

      const existingLogoPath = selectData[0]?.logo;

      const updateQuery = `
        UPDATE catalogues
        SET
          catalogue_name = ?,
          company_name = ?,
          about_company = ?,
          company_address = ?,
          email_address = ?,
          contact_number = ?,
          logo = ?
        WHERE id = ?
      `;

      const updateValues = [
        catalogueName,
        companyName,
        aboutCompany,
        companyAddress,
        emailAddress,
        contactNumber,
        logoPath || existingLogoPath,
        catalogueId,
      ];

      db.query(updateQuery, updateValues, (updateErr, updateData) => {
        if (updateErr) {
          return res
            .status(500)
            .json({ message: "Failed to update catalogue", error: updateErr });
        }

        // Delete the old logo if a new one is uploaded
        if (logoPath && existingLogoPath) {
          fs.unlink(existingLogoPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Failed to delete old logo:", unlinkErr);
            }
          });
        }

        res.status(200).json({ message: "Catalogue updated successfully" });
      });
    });
  });
};

export const deleteCatalogue = (req, res) => {
  const catalogueId = req.params.id; // Extract the catalogue ID from the URL

  // Fetch the catalogue to get the logo path
  const selectQuery = "SELECT logo FROM catalogues WHERE id = ?";
  db.query(selectQuery, [catalogueId], (selectErr, selectData) => {
    if (selectErr) {
      return res.status(500).json({
        message: "Failed to retrieve catalogue data",
        error: selectErr,
      });
    }

    const logoPath = selectData[0]?.logo;

    // Delete the catalogue from the database
    const deleteQuery = "DELETE FROM catalogues WHERE id = ?";
    db.query(deleteQuery, [catalogueId], (deleteErr, deleteData) => {
      if (deleteErr) {
        return res
          .status(500)
          .json({ message: "Failed to delete catalogue", error: deleteErr });
      }

      // Delete the logo file if it exists
      if (logoPath) {
        fs.unlink(logoPath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Failed to delete logo file:", unlinkErr);
          }
        });
      }

      res.status(200).json({ message: "Catalogue deleted successfully" });
    });
  });
};
